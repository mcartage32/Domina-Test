import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import UserForm from "./forms/UserForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: 300,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Formik initialValues={{}} onSubmit={async (_values: any) => {}}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: "100%",
            }}
          >
            <UserForm isRegister={false} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("registration")}
            >
              Registrarse
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
