import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

interface Step {
  number: number;
  title: string;
  description: string;
  code?: string;
  language?: string;
}

interface StepGuideProps {
  steps: Step[];
}

export default function StepGuide({ steps }: StepGuideProps): JSX.Element {
  return (
    <div className={styles.container}>
      {steps.map((step) => (
        <div key={step.number} className={styles.step}>
          <div className={styles.number}>{step.number}</div>
          <div className={styles.content}>
            <h4 className={styles.title}>{step.title}</h4>
            <p className={styles.description}>{step.description}</p>
            {step.code && (
              <CodeBlock language={step.language || 'bash'}>
                {step.code}
              </CodeBlock>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
