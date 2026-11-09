import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '@/components/ui/Icons';
import styles from './TopicCard.module.css';

interface TopicCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  cta: string;
  href: string;
}

export function TopicCard({ icon, title, text, cta, href }: TopicCardProps) {
  return (
    <li className={styles.item}>
      <Link className={styles.card} to={href}>
        <span className={styles.symbols}>
          <span className={styles.category}>
            <span className={styles.icon}>{icon}</span>
          </span>
          <span className={styles.arrow}>
            <ArrowIcon />
          </span>
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
        <span className={styles.cta}>{cta}</span>
      </Link>
    </li>
  );
}
