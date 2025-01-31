import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateNoteInterface, Note, Tag } from "./Interfaces";
import axios from "axios";

const apiNotes = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useNoteListQuery = () => {
  return useQuery<Note[]>({
    queryKey: ["NoteList"],
    queryFn: async (): Promise<Note[]> => {
      const response = await apiNotes.get<Note[]>(`notes`);
      return response.data;
    },
  });
};

export const useNoteDetailQuery = (id: Number) => {
  return useQuery<Note>({
    queryKey: ["NoteDetail"],
    queryFn: async (): Promise<Note> => {
      const response = await apiNotes.get<Note>(`notes/${id}`);
      return response.data;
    },
  });
};

export const useCreateNoteMutation = () => {
  return useMutation({
    mutationKey: ["CreateNote"],
    mutationFn: async (sendData: CreateNoteInterface) => {
      const response = await apiNotes.post<Note>(`notes`, sendData);
      return response.data;
    },
  });
};

export const useEditNoteMutation = () => {
  return useMutation({
    mutationKey: ["EditNote"],
    mutationFn: async ({
      sendData,
      noteId,
    }: {
      sendData: any;
      noteId: number;
    }) => {
      const response = await apiNotes.put<Note>(`notes/${noteId}`, sendData);
      return response.data;
    },
  });
};

export const useDeleteNoteMutation = () => {
  return useMutation({
    mutationKey: ["DeleteNote"],
    mutationFn: async ({ noteId }: { noteId: number }) => {
      const response = await apiNotes.delete(`notes/${noteId}`);
      return response.data;
    },
  });
};

export const useTagListQuery = () => {
  return useQuery<Tag[]>({
    queryKey: ["TagList"],
    queryFn: async (): Promise<Tag[]> => {
      const response = await apiNotes.get<Tag[]>(`tags`);
      return response.data;
    },
  });
};

export const useAddTagsToNoteMutation = () => {
  return useMutation({
    mutationKey: ["addTagsToNote"],
    mutationFn: async ({ sendData, id }: { sendData: any; id: number }) => {
      const response = await apiNotes.post(`notes/${id}/tags`, sendData);
      return response.data;
    },
  });
};

export const useDeleteTagsToNoteMutation = () => {
  return useMutation({
    mutationKey: ["DeleteTagsToNote"],
    mutationFn: async ({
      idNote,
      idTag,
    }: {
      idNote: Number;
      idTag: Number;
    }) => {
      const response = await apiNotes.delete(`notes/${idNote}/tags/${idTag}`);
      return response.data;
    },
  });
};
