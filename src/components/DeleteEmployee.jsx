import React, { useState } from "react";
import "../styles/DeleteEmployee.css";

const DeleteEmployee = ({ onClose, onConfirm }) => {
  const [confirmationText, setConfirmationText] = useState("");

  const handleConfirm = () => {
    if (confirmationText.toLowerCase() === "poista") {
      onConfirm();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Haluatko varmasti poistaa tämän työntekijän?</h2>
        <p>Vahvistaaksesi, kirjoita <strong>poista</strong> alle:</p>
        <input
          type="text"
          placeholder="Kirjoita 'poista'"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
        />
        <button
          className="confirm-button"
          onClick={handleConfirm}
          disabled={confirmationText.toLowerCase() !== "poista"}
        >
          Vahvista
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
