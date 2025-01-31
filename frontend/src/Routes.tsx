import { useRoutes } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";

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
      element: <div>pruebaaa</div>,
    },
  ]);
};

export default Routes;
