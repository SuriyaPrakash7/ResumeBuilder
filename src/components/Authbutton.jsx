import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebase.config";

const Authbutton = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const gitAuthProvider = new GithubAuthProvider();

  const handleClick = async () => {
    try {
      switch (provider) {
        case "GoogleAuthProvider":
          await signInWithRedirect(auth, googleAuthProvider);
          break;
        case "GithubAuthProvider":
          await signInWithRedirect(auth, gitAuthProvider);
          break;
        default:
          await signInWithRedirect(auth, googleAuthProvider);
          break;
      }
    } catch (err) {
      console.error(`Error during sign-in: ${err.message}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md"
    >
      <Icon className="text-txtprimary text-xl group-hover:text-white" />
      <p className="text-txtprimary text-lg group-hover:text-white">{label}</p>
      <FaChevronCircleRight className="text-txtprimary text-base group-hover:text-white" />
    </div>
  );
};

export default Authbutton;

