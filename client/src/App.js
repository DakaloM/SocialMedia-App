import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, RouterProvider, createBrowserRouter, Navigate  } from "react-router-dom";
import Leftbar from "./components/leftbar/Leftbar";
import Navbar from "./components/navbar/Navbar";
import Rightbar from "./components/rightbar/Rightbar";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import "./style.scss";
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={darkMode? "theme-dark": "theme-light"}>
          <Navbar />
          <div style={{display: "flex", padding: "0", margin:"0"}}>
            <Leftbar />
            <div style={{flex: "6"}}>
              <Outlet />
            </div>
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoutes = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />;
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: 
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
