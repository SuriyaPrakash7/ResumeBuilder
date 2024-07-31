import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { HiLogout } from "react-icons/hi";
import { FadeInOut, slideupdownmenu } from "../animations";
import { auth } from "../config/firebase.config";
import { useQueryClient } from "react-query";
import { adminIds } from "../utils/helpers";

const Headerr = () => {
  const { data, isLoading, isError } = useUser();
  const { isMenu, setisMenu } = useState(false);
  const queryClient = useQueryClient();
  const signOutUser = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user".null);
    });
  };

  return (
    <header className="w-full flex items-center justify-between py-3 px-4 lf:px-8 border-b border-gray-100 bg-bgPrimary z-50 gap-12 sticky top-0">
      <Link to={"/"}>
        <img src={logo} className="w-12 h-auto object-contain" alt="Logo" />
      </Link>

      <div className="flex-1 border border-gray-300 px-4 py-1 rounded-md flex items-center justify-between bg-gray-200">
        <input
          type="text"
          placeholder="Search here"
          className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none"
        />
      </div>

      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#49BFCD" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div
                {...FadeInOut}
                className="relative"
                onClick={() => setisMenu(!isMenu)}
              >
                {data.photoURL ? (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center">
                    <img
                      src={data?.photoURL}
                      className="w-full h-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                      alt="User Profile"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md">
                    <p className="text-lg text-white"> {data?.email[0]} </p>
                    {/* Optional placeholder for users without a profile picture */}
                  </div>
                )}

                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      {...slideupdownmenu}
                      className="absolute px-4 py-3 rounded-md bg-white right-0 top-14 flex flex-col
                 items-center justify-start gap-3 w-64 pt-12"
                      onMouseLeave={() => setisMenu(false)}
                    >
                      {data.photoURL ? (
                        <div className="w-12 h-12 rounded-full relative flex items-center justify-center">
                          <img
                            src={data.photoURL}
                            className="w-full h-full object-cover rounded-md"
                            referrerPolicy="no-referrer"
                            alt="User Profile"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-12 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md">
                          <p className="text-lg text-white">
                            {" "}
                            {data?.email[0]}{" "}
                          </p>
                          {/* Optional placeholder for users without a profile picture */}
                        </div>
                      )}
                      {data?.displayName && (
                        <p className="text-lg bg-txtDark  text-white">
                          {" "}
                          {data?.displayName}{" "}
                        </p>
                      )}
                      <div className="w-full flex flex-col items-start gap-8 pt-6">
                        <Link
                          className="text-txtLight hover:to-txtDark text-base whitespace-nowrap"
                          to={"/profile"}
                        >
                          {" "}
                          My Account{" "}
                        </Link>
                        {adminIds.includes(data?.uid) && (
                          <Link
                            className="text-txtLight hover:to-txtDark text-base whitespace-nowrap"
                            to={"/template/create"}
                          >
                            Add New Template
                          </Link>
                        )}

                        <div
                          className="w-full px-2 py-2 border-top
                       border-gray-300 flex items-center justify-between
                        cursor-pointer"
                          onClick={signOutUser}
                        >
                          <p>Sign Out</p>
                          <HiLogout className=" group-hover:text-txtDark text-txtLight" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button
                  className="px-4 py-2 rounded-md border border-gray-300 bg-gray-200 hover:shadow-md active:scale-95 duration-150"
                  type="button"
                  {...FadeInOut}
                >
                  Login
                </motion.button>
              </Link>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Headerr;
