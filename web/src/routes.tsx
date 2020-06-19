import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePost} path="/create-post" />
      <Route component={EditPost} path="/edit-post/:postId" />
    </BrowserRouter>
  );
};

export default Routes;
