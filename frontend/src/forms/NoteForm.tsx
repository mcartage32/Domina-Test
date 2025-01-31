import {
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useField } from "formik";
import { useTagListQuery } from "../api/ApiHooks";

const NoteForm = () => {
  const { data: tagsOptions, isLoading } = useTagListQuery();
  const [titleField, titleMeta] = useField("title");
  const [contentField, contentMeta] = useField("content");
  const [archivedField, , archivedHelpers] = useField("archived");
  const [tagsField, , tagsHelpers] = useField("tags");

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <TextField
        {...titleField}
        label="Título"
        error={Boolean(titleMeta.touched && titleMeta.error)}
        helperText={titleMeta.touched && titleMeta.error ? titleMeta.error : ""}
        required
      />
      <TextField
        {...contentField}
        label="Contenido"
        multiline
        rows={4}
        error={Boolean(contentMeta.touched && contentMeta.error)}
        helperText={
          contentMeta.touched && contentMeta.error ? contentMeta.error : ""
        }
        required
      />
      <FormControlLabel
        label="¿Desea archivarla?"
        control={
          <Switch
            checked={Boolean(archivedField.value)}
            onChange={(event) => {
              archivedHelpers.setValue(event.target.checked);
            }}
            size="medium"
          />
        }
      />
      <Autocomplete
        multiple
        fullWidth
        id="tags"
        options={tagsOptions || []}
        value={tagsField.value}
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, value) => {
          tagsHelpers.setValue(value);
        }}
        renderInput={(params) => <TextField {...params} label="Categorias" />}
      />
    </>
  );
};

export default NoteForm;
