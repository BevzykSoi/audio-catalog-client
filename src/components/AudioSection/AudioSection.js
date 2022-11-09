import styles from './AudioSection.module.css';

function AudioSection({ title, children }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default AudioSection;
