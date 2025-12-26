import React, { useState } from 'react';
import styles from './styles.module.css';

interface ABIInput {
  name: string;
  type: string;
  indexed?: boolean;
}

interface ABIItem {
  name: string;
  type: 'function' | 'event' | 'constructor' | 'fallback' | 'receive';
  inputs: ABIInput[];
  outputs?: ABIInput[];
  stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
}

interface ContractABIProps {
  name: string;
  address: string;
  abi: ABIItem[];
}

export default function ContractABI({ name, address, abi }: ContractABIProps): JSX.Element {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const functions = abi.filter(item => item.type === 'function');
  const events = abi.filter(item => item.type === 'event');

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMutabilityColor = (mutability?: string) => {
    switch (mutability) {
      case 'view':
      case 'pure':
        return styles.mutabilityView;
      case 'payable':
        return styles.mutabilityPayable;
      default:
        return styles.mutabilityNonpayable;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.addressContainer}>
          <code className={styles.address}>{address}</code>
          <button
            className={styles.copyBtn}
            onClick={copyAddress}
            type="button"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {functions.length > 0 && (
        <>
          <h4 className={styles.sectionTitle}>Functions</h4>
          <div className={styles.list}>
            {functions.map((fn) => (
              <div
                key={fn.name}
                className={`${styles.item} ${expanded === fn.name ? styles.itemExpanded : ''}`}
              >
                <button
                  className={styles.itemHeader}
                  onClick={() => setExpanded(expanded === fn.name ? null : fn.name)}
                  type="button"
                >
                  <span className={styles.fnName}>{fn.name}</span>
                  <span className={styles.params}>
                    ({fn.inputs.map(i => `${i.type} ${i.name}`).join(', ')})
                  </span>
                  {fn.stateMutability && (
                    <span className={`${styles.mutability} ${getMutabilityColor(fn.stateMutability)}`}>
                      {fn.stateMutability}
                    </span>
                  )}
                  <span className={styles.expandIcon}>{expanded === fn.name ? '−' : '+'}</span>
                </button>
                {expanded === fn.name && (
                  <div className={styles.details}>
                    {fn.inputs.length > 0 && (
                      <>
                        <h5>Inputs</h5>
                        <ul>
                          {fn.inputs.map((input, idx) => (
                            <li key={idx}>
                              <code>{input.type}</code> <span>{input.name}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {fn.outputs && fn.outputs.length > 0 && (
                      <>
                        <h5>Returns</h5>
                        <ul>
                          {fn.outputs.map((output, idx) => (
                            <li key={idx}>
                              <code>{output.type}</code> {output.name && <span>{output.name}</span>}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {events.length > 0 && (
        <>
          <h4 className={styles.sectionTitle}>Events</h4>
          <div className={styles.list}>
            {events.map((event) => (
              <div key={event.name} className={styles.eventItem}>
                <span className={styles.eventName}>{event.name}</span>
                <span className={styles.params}>
                  ({event.inputs.map(i => `${i.indexed ? 'indexed ' : ''}${i.type} ${i.name}`).join(', ')})
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
