import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../forms/NoteForm";
import {
  useAddTagsToNoteMutation,
  useDeleteTagsToNoteMutation,
  useEditNoteMutation,
  useNoteDetailQuery,
} from "../api/ApiHooks";
import { detailedDiff, diff } from "deep-object-diff";
import { isEmpty, omit } from "lodash";
import { toast } from "react-toastify";

const extractTagIds = (diferences: any) => {
  const aux: any = diferences?.added;
  const idsTags: number[] = [];
  for (const key in aux?.tags) {
    idsTags.push(aux?.tags[key].id);
  }
  return idsTags;
};

const findRemovedIds = (original: any[], updated: any[]) => {
  const updatedIds = new Set(updated.map((item) => item.id));
  const removedIds = original
    .filter((item) => !updatedIds.has(item.id))
    .map((item) => item.id);

  return removedIds;
};

const EditNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const {
    data: dataNote,
    isLoading,
    refetch,
  } = useNoteDetailQuery(Number(noteId));
  const { mutateAsync: addTagsToNote } = useAddTagsToNoteMutation();
  const { mutateAsync: deleteTags } = useDeleteTagsToNoteMutation();
  const { mutateAsync: editNote } = useEditNoteMutation();

  if (isLoading) return <CircularProgress />;

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
        Editar nota {noteId}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={dataNote}
        onSubmit={async (values: any) => {
          const diferences = detailedDiff(dataNote || {}, values);
          if (isEmpty(diff(dataNote || {}, values)))
            return toast.info("No actualizo ningún campo.");
          if (!isEmpty(diferences?.added)) {
            const tagsToAdd = extractTagIds(diferences);
            addTagsToNote(
              {
                id: Number(noteId),
                sendData: { tagIds: tagsToAdd },
              },
              {
                onSuccess: () => {
                  refetch();
                  toast.success("Se agregaron las categorías correctamente.");
                },
                onError: () => {
                  toast.error("Error al agregar las categorías.");
                },
              }
            );
          }
          if (!isEmpty(diferences?.deleted)) {
            const idsTagToDelete = findRemovedIds(
              dataNote?.tags || [],
              values?.tags || []
            );
            idsTagToDelete.forEach((tagId) => {
              deleteTags(
                {
                  idNote: Number(noteId),
                  idTag: tagId,
                },
                {
                  onSuccess: () => {
                    refetch();
                    toast.success(`Etiqueta eliminada correctamente.`);
                  },
                  onError: () => {
                    toast.error("Error al eliminar la etiqueta.");
                  },
                }
              );
            });
          }
          if (!isEmpty(omit(diferences?.updated, "tags"))) {
            editNote(
              {
                noteId: Number(noteId),
                sendData: omit(diferences?.updated, "tags"),
              },
              {
                onSuccess: () => {
                  toast.success("Se actualizo la nota correctamente");
                },
                onError: (_error) => {
                  toast.error("Error al actualizar la nota");
                },
              }
            );
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
            Actualizar
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default EditNote;
