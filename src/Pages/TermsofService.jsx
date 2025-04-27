import React from "react";
import Header from "../components/header";
import "../styles/Services.css"

function ServiceTerms() {
        return (
            <>
            <Header />
            <div className="Terms-service">
                <h1> Terms of Service </h1>
                <p>This EMS (Employee State Management) site provides information and ways to handle worker information to employer.
                    Service is used by employees to see their work schedule and employers to manage their employees. If you have problems with information provided or have concerns, 
                    contact your departments manager to edit or delete your information.
                </p>

                <h2>What information site uses?</h2>
                <ul>
                    <li> Workers full name</li>
                    <li> Workers Salary (Seen only by admins)</li>
                </ul>
                <p>Email information is provided to you by company.</p>
                <h2>Why is information needed?</h2>
                <ul>
                    <li>Handling basic employee information</li>
                    <li>Handling work schedule</li>
                    <li>Handling employees salary information</li>
                </ul>
                <p>Employees full name and work email is shown to everyone under the organisation. Salary information is only seen by admin users. Work schedule is seen only by you,
                except if the event is filtered to be seen by everyone.</p>

                <h2>Information storage and security</h2>
                <p>All information is stored in Google API, firestore where information is handled by Google's secure service. Site uses user roles to filter what can be seen. Only 
                    employees with firestore logins, can get to firestore.
                </p>
                <h2>User responsibilities and rights</h2>
                <p>User gives accurate and current information. User can't share organisation information to third parties without permission. </p>
                
            </div>
            </>
    )
}

export default ServiceTerms