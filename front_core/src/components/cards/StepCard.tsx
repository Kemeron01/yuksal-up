import styles from './StepCard.module.css';

interface StepCardProps {
  number: string;
  title: string;
  text: string;
}

export function StepCard({ number, title, text }: StepCardProps) {
  return (
    <li className={styles.card}>
      <span className={styles.number}>{number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </li>
  );
}
