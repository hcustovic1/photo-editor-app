import React from 'react';
import styles from './Loading.module.css';

export const Loading: React.FC = () => {
  return (
    <div className={styles.loaderContainer} role="alert" aria-busy="true">
      <div className={styles.spinner} aria-hidden="true"></div>
      <p>Loading...</p>
    </div>
  );
};
