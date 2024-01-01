import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContextProvider";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../services/firebase";

const BasvuruListesi = () => {
  const [data, setData] = useState([]);
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        let list = [];
        try {
          const applications = query(
            collection(db, "userApplications"),
            where("applicationStatusCode", "==", "waiting")
          );
          const querySnapshot = await getDocs(applications);
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDetails = async (id) => {
    try {    
      await navigate(`/admin/basvuru/${id}`, {
        state: {
          id: id,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="applicationInfo">
      <div className="applicationLists">
        <h1 className="applicationListHeader">Applications</h1>
        {data.map((item) => {
          return (
            <div key={item.id} className="applicationListItem">
              <p>
                {item.userName} {item.userlastName}
              </p>
              <p>
                <span>Reason:</span> {item.userReason.substring(0, 30)}...
              </p>
              <p></p>
              <span className="dateItem">
                {item.applicationDate.toDate().toISOString().substring(0, 10)}
              </span>
              <button
                className="saveButton"
                onClick={() => handleDetails(item.id)}
              >
                See Details
              </button>
            </div>
          );
        })}
        <div className="logout">
          <button className="saveButton" onClick={handleLogout} type="submit">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default BasvuruListesi;
