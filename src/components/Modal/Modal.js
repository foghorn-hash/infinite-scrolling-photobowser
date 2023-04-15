import React from 'react';
import './Modal.css';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Image from 'react-bootstrap/Image';

const Modal = ({ handleClose, show, showSpinner, showPhoto, children }) => {
	
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const showHideSpinnerNane = showSpinner ? "display-block" : "display-none";
  const showHidePhotoNane = showPhoto ? "display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <section className="card modal-main">
	    {children}
		<div id="modalWindow" className={showHideSpinnerNane}>
		</div>
		<div id="modalPhoto" className={showHidePhotoNane}>
		</div>
		<div className="clear"></div>
        <Button onClick={handleClose}>
          Close
        </Button>
      </section>
    </div>
  );
};

export default Modal;