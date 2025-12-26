import React from 'react';
import styles from './styles.module.css';

interface ContractCardProps {
  name: string;
  description: string;
  address: string;
  network: string;
  docsLink: string;
}

export default function ContractCard({
  name,
  description,
  address,
  network,
  docsLink,
}: ContractCardProps): JSX.Element {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.network}>{network}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.address}>
        <code>{address}</code>
        <button
          className={styles.copyBtn}
          onClick={copyAddress}
          type="button"
        >
          Copy
        </button>
      </div>
      <a href={docsLink} className={styles.link}>View Documentation &rarr;</a>
    </div>
  );
}
