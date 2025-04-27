import React from "react";
import Header from "../components/header";
import { useTranslation } from "react-i18next";
import "../styles/Services.css"

function ServiceTerms() {
    const { t } = useTranslation();

        return (
            <>
            <Header />
            <div className="Terms-service">
                <h1>{t("Terms of Service")} </h1>
                <p>{t("EMSInfo")}
                {t("EMSInfo2")}
                {t("EMSInfo3")}
                </p>

                <h2>{t("What information site uses?")}</h2>
                <ul>
                    <li> {t("Workers full name")}</li>
                    <li> {t("Workers Salary (Seen only by admins)")}</li>
                </ul>
                <p>{t("Email information is provided to you by company.")}</p>
                <h2>{t("Why is information needed?")}</h2>
                <ul>
                    <li>{t("Handling basic employee information")}</li>
                    <li>{t("Handling work schedule")}</li>
                    <li>{t("Handling employees salary information")}</li>
                </ul>
                <p>{t("InfoShown")}</p>

                <h2>{t("Information storage and security")}</h2>
                <p>{t("InfoShown2")}
                </p>
                <h2>{t("User responsibilities and rights")}</h2>
                <p>{t("InfoShown3")}</p>
                
            </div>
            </>
    )
}

export default ServiceTerms