import React from 'react';
import styles from './styles.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  link,
}: FeatureCardProps): JSX.Element {
  const Card = link ? 'a' : 'div';
  return (
    <Card className={styles.card} href={link}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}
