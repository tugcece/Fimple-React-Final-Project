import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BasvuruSorgula = () => {
      const [searchData, setSearchData] = useState();
      const navigate = useNavigate();
      const handleSearch = async () => {
            try {
              await navigate(`/basvuru/${searchData}`, {
                state: {
                  applicationCode: searchData,
                },
              });
            } catch (e) {
              console.log(e.message);
            }
      };


  return (
    <div className="applicationSearch">
      <form className="applicationSearchForm">
        <input
          className="registerInput"
          type="text"
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button className="searchApplication" onClick={handleSearch}>Search</button>
      </form>
    </div>
  );
};
export default BasvuruSorgula;
