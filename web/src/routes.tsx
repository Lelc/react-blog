import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePost} path="/create-post" />
    </BrowserRouter>
  );
};

export default Routes;
