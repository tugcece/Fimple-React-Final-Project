import React from "react";

const NotFoundPage = () => {

  return (
    <div className="successScreen">
      <div className="successMessageContainer">
        <img src={require('../images/notFoundPage.png')} alt="error" className="errorImg"/>
        <h1>Oops, something went wrong!</h1>
    </div>
    </div>
  );
};
export default NotFoundPage;
