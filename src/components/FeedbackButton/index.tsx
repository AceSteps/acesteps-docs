import React from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import styles from './styles.module.css';

interface FeedbackButtonProps {
  pageTitle?: string;
  pagePath?: string;
}

export default function FeedbackButton({
  pageTitle = 'this page',
  pagePath = '',
}: FeedbackButtonProps): JSX.Element {
  const issueUrl = `https://github.com/Batuhan4/acesteps-docs/issues/new?title=Feedback: ${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(`Page: ${pagePath}\n\n## Feedback\n\n`)}`;

  return (
    <div className={styles.container}>
      <span className={styles.label}>Was this page helpful?</span>
      <div className={styles.buttons}>
        <button className={styles.button} type="button" title="Yes, helpful">
          <ThumbsUp size={16} />
        </button>
        <button className={styles.button} type="button" title="No, needs improvement">
          <ThumbsDown size={16} />
        </button>
        <a
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          title="Report an issue"
        >
          <MessageSquare size={16} />
          <span>Report issue</span>
        </a>
      </div>
    </div>
  );
}
