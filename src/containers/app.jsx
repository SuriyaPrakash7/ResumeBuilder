import React, { Suspense } from "react";

import {Route, Routes} from "react-router-dom"
import {HomeScreen,Authentication} from "../pages"
const app = () => {
  return <Suspense
    fallback={<div>
      Loading...</div>}>
      <Routes>
        <Route path="/*" element ={<HomeScreen />} />
        <Route path="/auth" element={<Authentication/>}/>

      </Routes>

  </Suspense>;
};

export default app