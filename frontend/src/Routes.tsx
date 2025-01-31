import { useRoutes } from "react-router-dom";
import App from "./App";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/create",
      element: <CreateNote />,
    },
    {
      path: "/edit/:noteId",
      element: <EditNote />,
    },
  ]);
};

export default Routes;
