import { useRoutes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

const Routes = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.userId) {
      navigate("/");
    }
  }, [auth?.userId, navigate]);

  return useRoutes([
    {
      path: "/",
      element: !auth?.userId ? <Login /> : <Home />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/user/:userId/tasks",
      element: auth?.userId ? <Home /> : <Login />,
    },
    {
      path: "create",
      element: auth?.userId ? <CreateTask /> : <Login />,
    },
    {
      path: "edit/:taskId",
      element: auth?.userId ? <EditTask /> : <Login />,
    },
  ]);
};

export default Routes;
