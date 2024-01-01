import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();


const Admin = () => {
  const [errorContent, setErrorContent] = useState("");
  const [error, setError] = useState("");
  const { login } = UserAuth();
  const navigate = useNavigate();
  const {
          register,
          formState: { errors },
          handleSubmit,
        } = useForm( {resolver: yupResolver(schema),});
        const onSubmit = async (data) => {
          setError("");
          try {
            await login(data.email, data.password);
            navigate("basvuru-listesi");
          } catch (e) {
            setErrorContent(true);
            setError(error);
          }
        };

  return (
    <div className="admin">
      <div className="login">
        <div className="loginText">
          <div className="logo" />
          <h1>Welcome Back!</h1>
          <h5>Please enter your details</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorContent && (
            <p className="applicationErrorMessages">
              Please check your password and username!
            </p>
          )}
          <label className="title">User Name</label>
          <input {...register("email")} className="registerInput" />
          <p className="applicationErrorMessages">{errors.email?.message}</p>
          <label className="title">Password</label>
          <input
            {...register("password")}
            type="password"
            className="registerInput"
          />
          <p className="applicationErrorMessages">{errors.password?.message}</p>
          <button type="submit" className="loginBtn">
            Log In
          </button>
        </form>
      </div>
      <div className="picture"></div>
    </div>
  );
};
export default Admin;
