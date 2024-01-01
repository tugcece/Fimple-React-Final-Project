import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import NotFoundPage from "./NotFoundPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBasvuruDetay = () => {
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [adminReply, setAdminReply] = useState("");
    const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "userApplications", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());

        } else {
          setNotFound(true);
        }
      } catch (err) {
        setNotFound(true);
        console.log("No document!" + err);
      }
    };
    fetchData();
  }, [id]);

  if (notFound) {
    return <NotFoundPage />;
  }


  const HandleSubmit = async () => {
    const updatedData = doc(db, "userApplications", id);
    try {
      toast("Successfully updated!", {
        className: "toastMessage",
        progressClassName: "toastProgress",
      });
      await updateDoc(updatedData, {
        applicationStatusCode: selectedStatus,
        adminReply: adminReply,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleBack = async () => {
    navigate("/admin/basvuru-listesi");
  };

  return (
    <div className="applicationInfoPage">
      <div className="applicationDetailContent">
        <div className="applicationBack" onClick={handleBack}>
          Go Back
        </div>
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
        <div className="adminDetailInfo">
          <label className="text">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="waiting" defaultChecked>
                Waiting
              </option>
              <option value="solved">Solved</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <label className="text">
            <span>Admin Reply:</span>
            <input
              className="adminReply"
              type="text"
              value={adminReply}
              onChange={(e) => setAdminReply(e.target.value)}
            />
          </label>
        </div>
        <button className="saveButton" type="submit" onClick={HandleSubmit}>
          Save
        </button>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};
export default AdminBasvuruDetay;
