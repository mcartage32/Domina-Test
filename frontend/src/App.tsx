import "./styles/App.css";
import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import {
  useDeleteNoteMutation,
  useEditNoteMutation,
  useNoteListQuery,
  useTagListQuery,
} from "./api/ApiHooks";
import { isEmptyArray } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const { mutateAsync: editNote } = useEditNoteMutation();
  const { mutateAsync: deleteNote } = useDeleteNoteMutation();
  const {
    data: noteList,
    isLoading: isLoadingNotes,
    refetch,
  } = useNoteListQuery();
  const { data: tagsOptions, isLoading: isLoadingTags } = useTagListQuery();
  const columns = [
    "Título",
    "Contenido",
    "¿Está archivada?",
    "Categorías",
    "Opciones",
  ];

  const options = [
    { label: "Archivado", value: true },
    { label: "Desarchivado", value: false },
    ...(tagsOptions
      ? tagsOptions.map((tag) => ({
          label: tag.name,
          value: tag.name,
        }))
      : []),
  ];

  const [filter, setFilter] = useState<{ label: string; value: any } | null>(
    null
  );

  const filteredNoteList = noteList?.filter((note) => {
    if (!filter) return true;

    if (typeof filter.value === "boolean") {
      return note.archived === filter.value;
    }
    return note.tags.some((tag) => tag.name === filter.value);
  });

  if (isLoadingNotes || isLoadingTags) return <CircularProgress />;

  return (
    <>
      <h2>Notas</h2>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: "8vh", justifyContent: "space-between" }}
      >
        <Autocomplete
          options={options}
          value={filter}
          onChange={(_event, newValue) => setFilter(newValue)}
          sx={{ width: "100%" }}
          groupBy={(option) =>
            typeof option.value === "boolean"
              ? "Estado de Archivado"
              : "Categorías"
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrar"
              slotProps={{
                input: {
                  ...params.InputProps,
                  fullWidth: true,
                  startAdornment: (
                    <>
                      <SearchIcon style={{ marginRight: 8 }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
        />

        <Button variant="contained" onClick={() => navigate("create")}>
          Agregar
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="dynamic table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
              {columns.map((column, columIndex) => (
                <TableCell key={columIndex}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNoteList?.map((note) => (
              <TableRow
                key={note?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{note?.title}</TableCell>
                <TableCell>{note?.content}</TableCell>
                <TableCell>{note?.archived ? "Si" : "No"}</TableCell>
                <TableCell>
                  {isEmptyArray(note?.tags)
                    ? "Sin categoría"
                    : note?.tags.map((tag) => tag.name).join(" - ")}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`edit/${note?.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      editNote(
                        {
                          noteId: Number(note?.id),
                          sendData: { archived: !note?.archived },
                        },
                        {
                          onSuccess: () => {
                            refetch();
                            toast.success(
                              `Se ${
                                !note?.archived ? "archivo" : "desarchivo"
                              } la nota`
                            );
                          },
                          onError: (_error) => {
                            toast.error(
                              "Error al actualizar el estado de archivado de la nota"
                            );
                          },
                        }
                      )
                    }
                  >
                    <ArchiveIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() =>
                      deleteNote(
                        { noteId: Number(note?.id) },
                        {
                          onSuccess: () => {
                            refetch();
                            toast.success("Se eliminó la nota correctamente.");
                          },
                          onError: (_error) => {
                            toast.error("Error al eliminar la nota");
                          },
                        }
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
