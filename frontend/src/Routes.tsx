import { useRoutes } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/user/:userId/tasks",
      element: <Home />,
    },
    {
      path: "create",
      element: <CreateTask />,
    },
    {
      path: "edit/:taskId",
      element: <EditTask />,
    },
  ]);
};

export default Routes;
