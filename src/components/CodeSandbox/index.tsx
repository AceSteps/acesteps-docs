import React from 'react';
import styles from './styles.module.css';

interface CodeSandboxProps {
  id: string;
  title?: string;
  height?: number;
}

export default function CodeSandbox({
  id,
  title,
  height = 500
}: CodeSandboxProps): JSX.Element {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark&view=preview`}
        className={styles.iframe}
        style={{ height: `${height}px` }}
        title={title || 'CodeSandbox'}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}
