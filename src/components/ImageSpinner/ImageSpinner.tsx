import React from 'react';
import styles from './ImageSpinner.module.css';

const ImageSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default ImageSpinner; 