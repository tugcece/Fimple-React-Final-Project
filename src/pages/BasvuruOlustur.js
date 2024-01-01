import React from "react";
import { useState } from "react";
import { db } from "../services/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import RandomCodeGenerator from "../components/RandomCodeGenerator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref, uploadBytes, getStorage } from "firebase/storage";

const schema = yup
  .object({
    name: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    age: yup.number().positive().integer().required(),
    idnumber: yup.string().required("Id is required"),
    reason: yup.string().required("Reason is required"),
  })
  .required();

const BasvuruOlustur = () => {
   const [statuscode, setStatusCode] = useState("waiting");
   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => { 
try {
  const applicationCode = RandomCodeGenerator(9);
  const docRef = await addDoc(collection(db, "userApplications"), {
    userName: data.name,
    userlastName: data.lastname,
    userAge: data.age,
    userIdNumber: data.idnumber,
    userReason: data.reason,
    userAddress: data.address,
    userCode: applicationCode,
    adminReply: null,
    applicationStatusCode: statuscode,
    applicationDate: serverTimestamp(),
    userFile: null,
  });
  console.log(docRef);
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `userApplicationFiles/${docRef.id}/applicationFile`
  );
  await uploadBytes(storageRef, data.file);
  await updateDoc(docRef, {
    userFile: `userApplicationFiles/${docRef.id}/applicationFile`,
  });
  navigate("/basvuru-basarili", {
    state: {
      successMessage: applicationCode,
    },
  });
} catch (error) {
  console.log("dbErr:", error);
}
 }


  return (
    <div className="HomePage">
      <div className="RegisterPart">
        <h4>Please Add Your Details</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="applicationForm">
            <label className="title">
              First Name
              <input className="registerInput" {...register("name")} />
              <p className="applicationErrorMessages">{errors.name?.message}</p>
            </label>
            <label className="title">
              Last Name
              <input className="registerInput" {...register("lastname")} />
              <p className="applicationErrorMessages">
                {errors.lastname?.message}
              </p>
            </label>
            <label className="title">
              Age
              <input
                type="number"
                className="registerInput"
                {...register("age")}
              />
              <p className="applicationErrorMessages">{errors.age?.message}</p>
            </label>
            <label className="title">
              Id Number
              <input
                type="number"
                className="registerInput"
                {...register("idnumber")}
              />
              <p className="applicationErrorMessages">
                {errors.idnumber?.message}
              </p>
            </label>
            <label className="title">
              Application Reason
              <input className="registerInput" {...register("reason")} />
              <p className="applicationErrorMessages">
                {errors.reason?.message}
              </p>
            </label>
            <label className="title">
              Address Information
              <input className="registerInput" {...register("address")} />
              <p className="applicationErrorMessages">
                {errors.address?.message}
              </p>
            </label>
            <input
              type="file"
              className="registerInput"
              {...register("file")[0]}
            />
          </div>
          <input type="submit" className="registerSubmit" />
        </form>
      </div>
      <img
        className="formPhoto"
        src={require("../images/formBackground.jpeg")}
        alt="formPhoto"
      />
    </div>
  );
};
export default BasvuruOlustur;

