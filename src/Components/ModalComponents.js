import React, { useState, useEffect } from "react";
import "../Assets/CSS/Modal.css";

const Modal = ({ selectedPlanet }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedPlanet) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selectedPlanet]);

  const handleClose = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        {selectedPlanet && <h2>{selectedPlanet.name}</h2>}
      </div>
    </div>
  );
};

export default Modal;
