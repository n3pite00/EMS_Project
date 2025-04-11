import React, { useState } from "react";
import "../styles/DeleteEmployee.css";

const DeleteEmployee = ({ onClose, onConfirm }) => {
  const [confirmationText, setConfirmationText] = useState("");

  const handleConfirm = () => {
    if (confirmationText.toLowerCase() === "delete") {
      onConfirm();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Are you sure you want to delete this employee?</h2>
        <p>To confirm, type <strong>delete</strong> below:</p>
        <input
          type="text"
          placeholder="Type 'delete'"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
        />
        <button
          className="confirm-button"
          onClick={handleConfirm}
          disabled={confirmationText.toLowerCase() !== "delete"}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
