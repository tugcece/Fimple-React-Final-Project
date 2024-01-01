import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDocs, getDoc, query, where, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import NotFoundPage from "./NotFoundPage";

const Basvuru = () => {
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const location = useLocation();
  const applicationCode = location.state
    ? location.state.applicationCode
    : null;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const applications = query(
            collection(db, "userApplications"),
            where("userCode", "==", applicationCode)
          );
          const querySnapshot = await getDocs(applications);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setData(docSnap.data());
            } else {
              setNotFound(true);
            }
          }else{
             setNotFound(true);
          }
        } catch (err) {
          console.log(err);
          setNotFound(true);
        }
      };
      fetchData();
    }, [applicationCode]);

  if (notFound) {
    return <NotFoundPage />;
  }

  return (
    <div className="applicationInfoPage">
      <div className="applicationDetailContent">
        <h1 className="applicationDetailHeader">Application {data.userCode}</h1>
        <div className="applicationDetailItem">
          <div>
            <p className="text">
              <span>Name:</span>
              {data.userName}
            </p>
            <p className="text">
              <span>Last Name:</span>
              {data.userlastName}
            </p>
            <p className="text">
              <span>Id Number:</span>
              {data.userIdNumber}
            </p>
            <p className="text">
              <span>Age:</span>
              {data.userAge}
            </p>
            <p className="text">
              <span>Address:</span>
              {data.userAddress}
            </p>
            <p className="text">
              <span>Application Reason:</span>
              {data.userReason}
            </p>
          </div>
        </div>
        <div className="applicationDetailInfo">
          <div>
            <p className="text">
              <span>Status:</span>
              {data.applicationStatusCode}
            </p>
            <h4 className="text">Admin Reply:</h4>
            <p className="text">{data.adminReply}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Basvuru;
