import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/DeleteEmployee.css";

const DeleteEmployee = ({ onClose, onConfirm }) => {
  const [confirmationText, setConfirmationText] = useState("");
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (confirmationText.toLowerCase() === "delete") {
      onConfirm();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{t("deleteEmployeeConfirmTitle")}</h2>
        <p>{t("deleteEmployeeConfirmText")} <strong>{t("delete")}</strong>:</p>
        <input
          type="text"
          placeholder={t("typeDelete")}
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
        />
        <button
          className="confirm-button"
          onClick={handleConfirm}
          disabled={confirmationText.toLowerCase() !== "delete"}
        >
          {t("confirm")}
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
