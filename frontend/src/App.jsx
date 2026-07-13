// App.jsx

import { useEffect, useState } from "react";
import api from "./api/axios";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ServerLoader from "./components/ServerLoader";
import { serverLoaded } from "./api/users";

function App() {
    // useEffect(() => {
        //   api.get("/users") 
        //     .then((response) => { console.log(response.data); })
        //     .catch((error) => { console.error(error); });
        // }, []);
        
    const [loaded, setLoaded] = useState(false);
        
    useEffect(() => {
    const interval = setInterval(async () => {
        try {
        console.log("Trying...");

        const response = await serverLoaded();

        console.log("Response:", response);
        console.log("Data:", response.data);

        if (response.data) {
            console.log("SUCCESS");
            setLoaded(true);
            clearInterval(interval);
        }
        } catch (err) {
        console.log(err);
        }
    }, 2000);

    return () => clearInterval(interval);
    }, []);

        if (!loaded) {
            return <ServerLoader />;
        }

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