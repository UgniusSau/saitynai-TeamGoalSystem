import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Members from "./pages/members/Members";
import Teams from "./pages/teams/Teams";
import Goals from "./pages/goals/Goals";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/teams/:teamId/members/:memberId/goals"
        element={
          <PrivateRoute accessLevel={["Admin", "TeamLeader"]}>
            <Goals />
          </PrivateRoute>
        }
      />
      <Route
        path="/teams/:teamId/members"
        element={
          <PrivateRoute accessLevel={["Admin", "TeamLeader"]}>
            <Members />
          </PrivateRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <PrivateRoute accessLevel={["Admin", "TeamLeader"]}>
            <Teams />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
