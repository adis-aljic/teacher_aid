import React from 'react';
import ReactDom from 'react-dom';

import Card from './Card';
import Button from './Button';

import styles from './Modal.module.css';

const ModalBackdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      {props.children}
      <footer className={`${styles.footer} ${props.className}`}>
        <Button onClick={props.onConfirm}>Close</Button>
      </footer>
    </Card>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <ModalBackdrop onConfirm={props.onConfirm} />,
        document.getElementById('root-backdrop')
      )}

      {ReactDom.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          className={props.className}>
          {props.children}
        </ModalOverlay>,
        document.getElementById('root-overlay')
      )}
    </>
  );
};

export default Modal;
