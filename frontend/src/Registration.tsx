import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import UserForm from "./forms/UserForm";
import { useNavigate } from "react-router-dom";

const Registration = () => {
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
        <Typography variant="h5">Registro</Typography>
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
            <UserForm isRegister={true} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
            <Button variant="outlined" fullWidth onClick={() => navigate(-1)}>
              Volver
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Registration;
