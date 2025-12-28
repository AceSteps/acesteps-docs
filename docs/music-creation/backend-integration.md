---
sidebar_position: 4
title: Backend Integration
description: Technical documentation for AceSteps AI backend infrastructure
---

# Backend Integration

This page documents the technical infrastructure that powers AI music generation on AceSteps, including the API server, GPU inference pipeline, and storage systems.

## System Overview

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                           ACESTEPS BACKEND ARCHITECTURE                            ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                    ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │                              USER REQUEST                                    │ ║
║   │                                                                              │ ║
║   │   Farcaster Mini-App  ──────▶  POST /api/generate                           │ ║
║   │                                {prompt, duration, seed}                      │ ║
║   └──────────────────────────────────────┬──────────────────────────────────────┘ ║
║                                          │                                         ║
║                                          ▼                                         ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │                           FASTAPI SERVER                                     │ ║
║   │                        (Python 3.11 + Uvicorn)                              │ ║
║   │                                                                              │ ║
║   │   ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐       │ ║
║   │   │   Rate Limiter   │   │   Auth/Verify    │   │   Job Manager    │       │ ║
║   │   │                  │   │                  │   │                  │       │ ║
║   │   │ • 10/hr free     │   │ • Farcaster FID  │   │ • Queue jobs     │       │ ║
║   │   │ • 100/hr pro     │   │ • Wallet verify  │   │ • Track status   │       │ ║
║   │   │ • IP tracking    │   │ • Session mgmt   │   │ • Retry logic    │       │ ║
║   │   └──────────────────┘   └──────────────────┘   └──────────────────┘       │ ║
║   │                                      │                                       │ ║
║   └──────────────────────────────────────┼───────────────────────────────────────┘ ║
║                                          │                                         ║
║                    ┌─────────────────────┼─────────────────────┐                  ║
║                    │                     │                     │                   ║
║                    ▼                     ▼                     ▼                   ║
║   ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐     ║
║   │       SUPABASE       │ │        MODAL         │ │        IPFS          │     ║
║   │      (Database)      │ │    (GPU Compute)     │ │      (Metadata)      │     ║
║   │                      │ │                      │ │                      │     ║
║   │ ┌──────────────────┐ │ │ ┌──────────────────┐ │ │ ┌──────────────────┐ │     ║
║   │ │   PostgreSQL     │ │ │ │   A10G GPU       │ │ │ │   Pinata/IPFS    │ │     ║
║   │ │                  │ │ │ │                  │ │ │ │                  │ │     ║
║   │ │ • Jobs table     │ │ │ │ • ACE-Step 3.5B  │ │ │ │ • Song metadata  │ │     ║
║   │ │ • Users table    │ │ │ │ • Auto-scaling   │ │ │ │ • Cover images   │ │     ║
║   │ │ • Songs table    │ │ │ │ • Cold start     │ │ │ │ • Permanent      │ │     ║
║   │ └──────────────────┘ │ │ └──────────────────┘ │ │ └──────────────────┘ │     ║
║   │                      │ │                      │ │                      │     ║
║   │ ┌──────────────────┐ │ │ Webhook Endpoint:    │ │ CID returned for    │     ║
║   │ │   Storage        │ │ │ POST /generate       │ │ on-chain reference  │     ║
║   │ │                  │ │ │                      │ │                      │     ║
║   │ │ • Audio files    │ │ │ Returns:             │ │                      │     ║
║   │ │ • Public CDN     │ │ │ • audio_bytes        │ │                      │     ║
║   │ │ • 90-day TTL     │ │ │ • audio_hash         │ │                      │     ║
║   │ └──────────────────┘ │ └──────────────────────┘ └──────────────────────┘     ║
║   └──────────────────────┘                                                        ║
║                                                                                    ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

## API Endpoints

### Music Generation

#### POST /api/generate

Start a new music generation job.

**Request:**
```json
{
  "prompt": "lo-fi hip-hop beat with soft piano and rain sounds",
  "duration": 30,
  "seed": 42,
  "lyrics": null,
  "steps": 27
}
```

**Response:**
```json
{
  "job_id": "gen_abc123def456",
  "status": "queued",
  "estimated_time": 5,
  "position": 1
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | Music description (max 500 chars) |
| `duration` | int | Yes | Length in seconds (5-240) |
| `seed` | int | No | Reproducibility seed |
| `lyrics` | string | No | Optional lyrics text |
| `steps` | int | No | Inference steps (27 or 60) |

#### GET /api/generate/\{job_id\}

Check generation status.

**Response (In Progress):**
```json
{
  "job_id": "gen_abc123def456",
  "status": "processing",
  "progress": 45,
  "estimated_remaining": 3
}
```

**Response (Complete):**
```json
{
  "job_id": "gen_abc123def456",
  "status": "completed",
  "audio_url": "https://storage.acesteps.xyz/audio/gen_abc123def456.mp3",
  "audio_hash": "0x1a2b3c4d5e6f...",
  "duration": 30,
  "created_at": "2025-01-15T10:30:00Z"
}
```

| Status | Description |
|--------|-------------|
| `queued` | Waiting in queue |
| `processing` | GPU inference running |
| `completed` | Audio ready |
| `failed` | Generation error |

### Minting Support

#### POST /api/signature

Get a signature for minting the generated song as an NFT.

**Request:**
```json
{
  "job_id": "gen_abc123def456",
  "user_address": "0x1234...5678",
  "metadata_uri": "ipfs://Qm..."
}
```

**Response:**
```json
{
  "signature": "0xabc123...",
  "audio_hash": "0x1a2b3c4d...",
  "expires_at": "2025-01-15T11:30:00Z"
}
```

:::warning Security
Signatures are single-use and expire after 1 hour. The backend verifies that:
1. The `job_id` belongs to the requesting user
2. The generation was completed successfully
3. No signature was previously issued for this job
:::

#### POST /api/metadata

Upload song metadata to IPFS.

**Request:**
```json
{
  "name": "Rainy Day Vibes",
  "description": "A chill lo-fi beat for relaxing",
  "audio_url": "https://storage.acesteps.xyz/audio/gen_abc123.mp3",
  "cover_image": "data:image/png;base64,...",
  "attributes": {
    "genre": "lo-fi",
    "mood": "chill",
    "duration": 30,
    "bpm": 85
  }
}
```

**Response:**
```json
{
  "metadata_uri": "ipfs://QmXyz...",
  "metadata_hash": "0x789abc..."
}
```

## Modal GPU Infrastructure

### Function Configuration

```python
import modal

app = modal.App("acesteps-generation")

# GPU image with ACE-Step dependencies
image = modal.Image.debian_slim(python_version="3.11").pip_install(
    "torch>=2.0",
    "transformers",
    "acestep",
    "soundfile",
    "numpy"
).run_commands(
    "pip install flash-attn --no-build-isolation"
)

@app.function(
    image=image,
    gpu="A10G",                    # 24GB VRAM
    timeout=300,                   # 5 minute max
    memory=32768,                  # 32GB RAM
    secrets=[modal.Secret.from_name("acesteps-secrets")],
    retries=2,
    concurrency_limit=10,          # Max parallel jobs
)
def generate_music(
    prompt: str,
    duration: int,
    seed: int = None,
    steps: int = 27
) -> dict:
    """Generate music using ACE-Step model."""

    from acestep import ACEStepPipeline
    import torch
    import hashlib

    # Initialize pipeline (cached after first call)
    pipe = ACEStepPipeline.from_pretrained(
        "ACE-Step/ACE-Step-v1-3.5B",
        torch_dtype=torch.bfloat16,
        device="cuda"
    )

    # Generate audio
    result = pipe(
        prompt=prompt,
        duration=duration,
        num_inference_steps=steps,
        seed=seed,
    )

    # Convert to bytes
    audio_bytes = result.to_mp3(bitrate=320)
    audio_hash = hashlib.sha256(audio_bytes).hexdigest()

    return {
        "audio_bytes": audio_bytes,
        "audio_hash": f"0x{audio_hash}",
        "seed": result.seed,
        "duration": duration
    }
```

### Auto-Scaling Behavior

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MODAL AUTO-SCALING                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Idle State (No requests)                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Containers: 0                                                      │   │
│   │   GPU Usage: 0                                                       │   │
│   │   Cost: $0.00/hr                                                     │   │
│   │                                                                      │   │
│   │   Scale-to-zero saves costs during low traffic                      │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Cold Start (First request after idle)                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   1. Spin up container (~10s)                                       │   │
│   │   2. Load GPU drivers (~5s)                                         │   │
│   │   3. Download model weights (~15s, cached after first)              │   │
│   │   4. Initialize pipeline (~5s)                                       │   │
│   │   ────────────────────────────                                       │   │
│   │   Total cold start: ~30-35 seconds                                  │   │
│   │                                                                      │   │
│   │   Mitigation: Keep 1 warm instance during peak hours               │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Warm Request (Container already running)                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Generation time only: 4-5 seconds for 30s audio                   │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   High Traffic (Burst)                                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Request 1 ─────▶ Container 1                                      │   │
│   │   Request 2 ─────▶ Container 2  (parallel scaling)                  │   │
│   │   Request 3 ─────▶ Container 3                                      │   │
│   │   ...                                                                │   │
│   │   Request 10 ────▶ Container 10 (max concurrency)                   │   │
│   │   Request 11 ────▶ Queue (wait for available container)            │   │
│   │                                                                      │   │
│   │   Max parallel: 10 containers × 1 GPU each = 10 A10G GPUs          │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Cost Analysis

| Metric | Value |
|--------|-------|
| A10G Cost | ~$1.10/GPU-hour |
| Avg Generation | 5 seconds |
| Cost per Song | ~$0.0015 |
| Cold Start Overhead | ~$0.01 |
| Monthly (10k songs) | ~$25-50 |

## Supabase Integration

### Database Schema

```sql
-- Generation jobs table
CREATE TABLE generation_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    user_address TEXT NOT NULL,

    -- Input parameters
    prompt TEXT NOT NULL,
    duration INTEGER NOT NULL CHECK (duration BETWEEN 5 AND 240),
    seed BIGINT,
    steps INTEGER DEFAULT 27,
    lyrics TEXT,

    -- Status tracking
    status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
    progress INTEGER DEFAULT 0,
    error_message TEXT,

    -- Output data
    audio_url TEXT,
    audio_hash TEXT,
    actual_duration REAL,

    -- Minting data
    signature TEXT,
    signature_used BOOLEAN DEFAULT FALSE,
    metadata_uri TEXT,
    nft_token_id BIGINT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    -- Indexes
    CONSTRAINT valid_audio CHECK (
        (status = 'completed' AND audio_url IS NOT NULL AND audio_hash IS NOT NULL) OR
        status != 'completed'
    )
);

-- Indexes for common queries
CREATE INDEX idx_jobs_user ON generation_jobs(user_id);
CREATE INDEX idx_jobs_status ON generation_jobs(status);
CREATE INDEX idx_jobs_created ON generation_jobs(created_at DESC);
CREATE INDEX idx_jobs_address ON generation_jobs(user_address);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farcaster_fid BIGINT UNIQUE,
    wallet_address TEXT UNIQUE,

    -- Rate limiting
    tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
    daily_generations INTEGER DEFAULT 0,
    last_generation_reset DATE DEFAULT CURRENT_DATE,

    -- Stats
    total_generations INTEGER DEFAULT 0,
    total_minted INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rate limit function
CREATE OR REPLACE FUNCTION check_rate_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_tier TEXT;
    v_daily INTEGER;
    v_limit INTEGER;
BEGIN
    SELECT tier, daily_generations, last_generation_reset
    INTO v_tier, v_daily
    FROM users WHERE id = p_user_id;

    -- Reset daily count if new day
    IF last_generation_reset < CURRENT_DATE THEN
        UPDATE users SET daily_generations = 0, last_generation_reset = CURRENT_DATE
        WHERE id = p_user_id;
        v_daily := 0;
    END IF;

    -- Check limits
    v_limit := CASE v_tier
        WHEN 'free' THEN 10
        WHEN 'pro' THEN 100
        WHEN 'enterprise' THEN 10000
    END;

    RETURN v_daily < v_limit;
END;
$$ LANGUAGE plpgsql;
```

### Storage Configuration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE STORAGE BUCKETS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   generated-audio (Public Bucket)                                           │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Path: /audio/{job_id}.mp3                                         │   │
│   │   Access: Public read, authenticated write                          │   │
│   │   CDN: Enabled (global edge caching)                                │   │
│   │   TTL: 90 days (auto-cleanup for unminted songs)                    │   │
│   │   Max Size: 50 MB per file                                          │   │
│   │                                                                      │   │
│   │   URL Pattern:                                                       │   │
│   │   https://storage.acesteps.xyz/audio/gen_abc123.mp3                 │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   cover-images (Public Bucket)                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Path: /covers/{job_id}.png                                        │   │
│   │   Access: Public read, authenticated write                          │   │
│   │   CDN: Enabled                                                       │   │
│   │   Max Size: 5 MB per file                                           │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   temp-previews (Private Bucket)                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Path: /preview/{session_id}.mp3                                   │   │
│   │   Access: Signed URLs only (1 hour expiry)                          │   │
│   │   TTL: 24 hours (auto-delete)                                       │   │
│   │   Purpose: Pre-save previews before commitment                      │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Signature Flow

The signature system ensures only AI-generated music can be minted on-chain:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SIGNATURE GENERATION FLOW                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   STEP 1: User Completes Generation                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   User generates music via /api/generate                            │   │
│   │   Backend stores:                                                    │   │
│   │   • job_id                                                           │   │
│   │   • user_address                                                     │   │
│   │   • audio_hash (SHA256 of audio bytes)                              │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 2: User Requests Mint Signature                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   POST /api/signature                                                │   │
│   │   {                                                                  │   │
│   │     "job_id": "gen_abc123",                                         │   │
│   │     "user_address": "0x1234...5678",                                │   │
│   │     "metadata_uri": "ipfs://Qm..."                                  │   │
│   │   }                                                                  │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 3: Backend Validation                                                │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   ✓ Verify job_id belongs to user_address                          │   │
│   │   ✓ Verify job status is 'completed'                                │   │
│   │   ✓ Verify no previous signature issued                            │   │
│   │   ✓ Verify audio_hash matches stored value                         │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 4: Signature Creation                                                │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   # Python signing code                                              │   │
│   │   from eth_account import Account                                   │   │
│   │   from eth_account.messages import encode_defunct                   │   │
│   │                                                                      │   │
│   │   # Create message hash                                              │   │
│   │   message = Web3.solidity_keccak(                                   │   │
│   │       ['address', 'string', 'bytes32'],                             │   │
│   │       [user_address, metadata_uri, audio_hash]                      │   │
│   │   )                                                                  │   │
│   │                                                                      │   │
│   │   # Sign with platform private key                                  │   │
│   │   signed = Account.sign_message(                                    │   │
│   │       encode_defunct(message),                                       │   │
│   │       private_key=PLATFORM_SIGNER_KEY                               │   │
│   │   )                                                                  │   │
│   │                                                                      │   │
│   │   signature = signed.signature.hex()                                │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 5: On-Chain Verification                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   // Solidity contract verification                                 │   │
│   │   function mint(                                                     │   │
│   │       string calldata metadataURI,                                  │   │
│   │       bytes32 audioHash,                                            │   │
│   │       bytes calldata signature                                      │   │
│   │   ) external {                                                       │   │
│   │       // Recreate the message hash                                  │   │
│   │       bytes32 hash = keccak256(abi.encodePacked(                    │   │
│   │           msg.sender,                                                │   │
│   │           metadataURI,                                               │   │
│   │           audioHash                                                  │   │
│   │       ));                                                            │   │
│   │                                                                      │   │
│   │       // Verify signer is platform                                  │   │
│   │       address signer = ECDSA.recover(                               │   │
│   │           hash.toEthSignedMessageHash(),                            │   │
│   │           signature                                                  │   │
│   │       );                                                             │   │
│   │       require(signer == platformSigner, "Invalid signature");       │   │
│   │                                                                      │   │
│   │       // Prevent replay                                              │   │
│   │       require(!usedSignatures[signature], "Signature used");        │   │
│   │       usedSignatures[signature] = true;                             │   │
│   │                                                                      │   │
│   │       // Mint NFT                                                    │   │
│   │       _mint(msg.sender, nextTokenId++);                             │   │
│   │   }                                                                  │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Security Properties:                                                       │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   ✓ Only platform can create valid signatures                       │   │
│   │   ✓ Each signature can only be used once                           │   │
│   │   ✓ msg.sender is bound to signature (no front-running)            │   │
│   │   ✓ audio_hash ensures exact audio match                           │   │
│   │   ✓ No way to mint without going through AI generation             │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Rate Limiting

### Tier Configuration

| Tier | Rate Limit | Max Duration | Priority | Price |
|------|------------|--------------|----------|-------|
| Free | 10/day | 30 seconds | Low | $0 |
| Pro | 100/day | 120 seconds | High | $10/mo |
| Enterprise | Unlimited | 240 seconds | Highest | Custom |

### Implementation

```python
from fastapi import HTTPException
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self, supabase_client):
        self.db = supabase_client

    async def check_limit(self, user_id: str) -> bool:
        """Check if user can generate."""
        user = await self.db.table("users").select("*").eq("id", user_id).single().execute()

        tier = user.data["tier"]
        daily_count = user.data["daily_generations"]
        last_reset = user.data["last_generation_reset"]

        # Reset counter if new day
        if last_reset < datetime.now().date():
            await self.db.table("users").update({
                "daily_generations": 0,
                "last_generation_reset": datetime.now().date().isoformat()
            }).eq("id", user_id).execute()
            daily_count = 0

        # Check against tier limits
        limits = {"free": 10, "pro": 100, "enterprise": 10000}

        if daily_count >= limits[tier]:
            raise HTTPException(
                status_code=429,
                detail={
                    "error": "rate_limit_exceeded",
                    "limit": limits[tier],
                    "reset_at": (datetime.now() + timedelta(days=1)).replace(
                        hour=0, minute=0, second=0
                    ).isoformat()
                }
            )

        return True

    async def increment(self, user_id: str):
        """Increment generation count."""
        await self.db.rpc("increment_generation_count", {"p_user_id": user_id}).execute()
```

## Error Handling

### Error Codes

| Code | Name | Description | Retry |
|------|------|-------------|-------|
| `GEN_001` | Queue Full | Too many pending jobs | Yes (backoff) |
| `GEN_002` | GPU Unavailable | No GPU capacity | Yes (1 min) |
| `GEN_003` | Invalid Prompt | Prompt validation failed | No |
| `GEN_004` | Duration Exceeded | Duration > tier limit | No |
| `GEN_005` | Generation Failed | Model inference error | Yes (once) |
| `SIGN_001` | Invalid Job | Job not found or unauthorized | No |
| `SIGN_002` | Already Signed | Signature already issued | No |
| `RATE_001` | Rate Limited | Daily limit exceeded | No |

### Error Response Format

```json
{
  "error": {
    "code": "GEN_005",
    "message": "Generation failed due to model error",
    "details": "CUDA out of memory",
    "retry_after": 60,
    "job_id": "gen_abc123"
  }
}
```

## Monitoring & Observability

### Key Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Generation Latency (p50) | < 5s | > 10s |
| Generation Latency (p99) | < 15s | > 30s |
| Success Rate | > 99% | < 95% |
| Queue Depth | < 10 | > 50 |
| Cold Start Rate | < 10% | > 30% |
| GPU Utilization | 60-80% | < 30% or > 95% |

### Health Endpoints

```
GET /health          → Basic health check
GET /health/ready    → Readiness (DB + GPU connected)
GET /health/live     → Liveness (process running)
GET /metrics         → Prometheus metrics
```

## Related

- [ACE-Step AI](/music-creation/ace-step-ai) - Model overview
- [AI Architecture](/music-creation/ai-architecture) - Technical architecture
- [API Reference](/api-reference/backend-api) - Full API documentation
- [Smart Contracts](/smart-contracts/overview) - On-chain integration
