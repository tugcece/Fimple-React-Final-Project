import React from "react";
import { useLocation } from "react-router-dom";

const BasvuruBasarili = () => {
const location = useLocation();
const successMessage = location.state ? location.state.successMessage : null;

  return (
    <div className="successScreen">
      <div className="successMessageContainer">
        <h1>Thank You!</h1>
        <p className="successMessage">
          You will receive an e-mail about your application in the following
          days. You can find information about the application on the
          application enquiry page. Have a good day!
          <br />
          Here's your application code:
        </p>
        <div className="applicationCode">{successMessage}</div>
      </div>
      <div className="successImage" />
    </div>
  );
};
export default BasvuruBasarili;
