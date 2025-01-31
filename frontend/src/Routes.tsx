import { useRoutes } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import CreateTask from "./pages/CreateTask";

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
      path: "/user/:userid/tasks",
      element: <Home />,
    },
    {
      path: "create",
      element: <CreateTask />,
    },
  ]);
};

export default Routes;
