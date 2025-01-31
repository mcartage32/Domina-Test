import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import NoteForm from "../forms/NoteForm";
import { useNavigate } from "react-router-dom";
import {
  useAddTagsToNoteMutation,
  useCreateNoteMutation,
} from "../api/ApiHooks";
import { CreateNoteInterface } from "../api/Interfaces";
import { toast } from "react-toastify";

const CreateNote = () => {
  const { mutateAsync: createNote } = useCreateNoteMutation();
  const { mutate: addTagsToNote } = useAddTagsToNoteMutation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 2,
      }}
    >
      <Typography style={{ padding: 10 }} variant="h5">
        Crear una nota
      </Typography>
      <Formik
        initialValues={{
          title: "",
          content: "",
          archived: false,
          userId: 1,
          tags: [],
        }}
        onSubmit={async (values: CreateNoteInterface) => {
          try {
            const dataNote = await createNote(values);
            toast.success("Se ha creado la nota correctamente.");
            if (values?.tags) {
              addTagsToNote(
                { id: dataNote?.id, sendData: { tagIds: values?.tags } },
                {
                  onSuccess: () => {
                    toast.success("Se agregaron las categorías correctamente.");
                  },
                  onError: () => {
                    toast.error("Error al agregar las categorías.");
                  },
                }
              );
            }
            navigate(-1);
          } catch (_error) {
            toast.error("Error al crear la nota.");
          }
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "100%",
          }}
        >
          <NoteForm />
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateNote;
