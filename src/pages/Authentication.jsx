import React, { useEffect } from "react";
import logo from '../assets/logo.jpg';
import { Footer } from "../containers";
import { Authbutton } from "../components";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ToastContainer } from 'react-toastify'; // Ensure this is used or remove it if not needed
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Mainspinner from "../components/Mainspinner";

const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <Mainspinner />;
  }

  return (
    <div className="auth-section">
      <ToastContainer /> {/* Added this to use the ToastContainer */}
      <img src={logo} className="w-12 h-auto object-contain" alt="Logo" />
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6"> 
        <h1 className="text text-3xl lg:text-4xl text-blue-700">Welcome to Expressume</h1>
        <p className="text-base">Express your resume</p>
        <h2 className="text-2xl text-gray-600">Authenticate</h2>
        <div className="w-full lg:w-96 rounded-md flex flex-col justify-center items-center gap-6">
          <Authbutton Icon={FaGoogle} label={"Signin with Google"} provider={"GoogleAuthProvider"} />
          <Authbutton Icon={FaGithub} label={"Signin with GitHub"} provider={"GithubAuthProvider"} />
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Authentication;



