import React from 'react';
import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
  message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer} role="alert" aria-live="assertive">
      <div className={styles.errorIcon} aria-hidden="true">
        ⚠️
      </div>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
};
