import React from "react";
import { PuffLoader } from "react-spinners";

const Mainspinner = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <PuffLoader color='#498FCB' size={80} />


        
    </div>
  )
}

export default Mainspinner