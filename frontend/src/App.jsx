// App.jsx

import { useEffect } from "react";
import api from "./api/axios";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  // useEffect(() => {
  //   api.get("/users") 
  //     .then((response) => { console.log(response.data); })
  //     .catch((error) => { console.error(error); });
  // }, []);

  return(
    <>
      <Routes>
        <Route
            path="/"
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }
        />

        <Route
            path="/login"
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }
        />

        <Route
            path="/register"
            element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            }
        />
        <Route
            path="/chat"
            element={
                <ProtectedRoute>
                    <Chat />
                </ProtectedRoute>
            }
        />
      </Routes>
    </>
  )
}

export default App;