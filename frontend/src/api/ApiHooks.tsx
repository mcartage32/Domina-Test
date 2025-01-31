import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateTaskInterface,
  LoginInterface,
  LoginResponse,
  RegistrationInterface,
  TaskInterface,
  TaskPartial,
  UserInterface,
} from "./Interfaces";

const apiTaks = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useCreateUserMutation = () => {
  return useMutation({
    mutationKey: ["CreateUser"],
    mutationFn: async (sendData: RegistrationInterface) => {
      const response = await apiTaks.post<UserInterface>(
        `users/register`,
        sendData
      );
      return response.data;
    },
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationKey: ["LoginUser"],
    mutationFn: async (sendData: LoginInterface) => {
      const response = await apiTaks.post<LoginResponse>(
        `users/login`,
        sendData
      );
      return response.data;
    },
  });
};

export const useTaskListQuery = (idUser: number) => {
  return useQuery<TaskInterface[]>({
    queryKey: ["TaskList"],
    queryFn: async (): Promise<TaskInterface[]> => {
      const response = await apiTaks.get<TaskInterface[]>(
        `tasks/user/${idUser}`
      );
      return response.data;
    },
  });
};

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationKey: ["TaskCreate"],
    mutationFn: async (sendData: CreateTaskInterface) => {
      const response = await apiTaks.post<TaskInterface>(`tasks`, sendData);
      return response.data;
    },
  });
};

export const useTaskDetailQuery = (id: Number) => {
  return useQuery<TaskInterface>({
    queryKey: ["TaskDetail"],
    queryFn: async (): Promise<TaskInterface> => {
      const response = await apiTaks.get<TaskInterface>(`tasks/${id}`);
      return response.data;
    },
  });
};

export const useUpdateTaskMutation = () => {
  return useMutation({
    mutationKey: ["UpdateNote"],
    mutationFn: async ({
      sendData,
      taskId,
    }: {
      sendData: TaskPartial;
      taskId: number;
    }) => {
      const response = await apiTaks.put<TaskInterface>(
        `tasks/${taskId}`,
        sendData
      );
      return response.data;
    },
  });
};

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationKey: ["DeleteTask"],
    mutationFn: async ({ taskId }: { taskId: number }) => {
      const response = await apiTaks.delete(`tasks/${taskId}`);
      return response.data;
    },
  });
};

// export const useNoteDetailQuery = (id: Number) => {
//   return useQuery<Note>({
//     queryKey: ["NoteDetail"],
//     queryFn: async (): Promise<Note> => {
//       const response = await apiTaks.get<Note>(`notes/${id}`);
//       return response.data;
//     },
//   });
// };

// export const useCreateNoteMutation = () => {
//   return useMutation({
//     mutationKey: ["CreateNote"],
//     mutationFn: async (sendData: CreateNoteInterface) => {
//       const response = await apiTaks.post<Note>(`notes`, sendData);
//       return response.data;
//     },
//   });
// };

// export const useEditNoteMutation = () => {
//   return useMutation({
//     mutationKey: ["EditNote"],
//     mutationFn: async ({
//       sendData,
//       noteId,
//     }: {
//       sendData: any;
//       noteId: number;
//     }) => {
//       const response = await apiTaks.put<Note>(`notes/${noteId}`, sendData);
//       return response.data;
//     },
//   });
// };

// export const useDeleteNoteMutation = () => {
//   return useMutation({
//     mutationKey: ["DeleteNote"],
//     mutationFn: async ({ noteId }: { noteId: number }) => {
//       const response = await apiTaks.delete(`notes/${noteId}`);
//       return response.data;
//     },
//   });
// };

// export const useTagListQuery = () => {
//   return useQuery<Tag[]>({
//     queryKey: ["TagList"],
//     queryFn: async (): Promise<Tag[]> => {
//       const response = await apiTaks.get<Tag[]>(`tags`);
//       return response.data;
//     },
//   });
// };

// export const useAddTagsToNoteMutation = () => {
//   return useMutation({
//     mutationKey: ["addTagsToNote"],
//     mutationFn: async ({ sendData, id }: { sendData: any; id: number }) => {
//       const response = await apiTaks.post(`notes/${id}/tags`, sendData);
//       return response.data;
//     },
//   });
// };

// export const useDeleteTagsToNoteMutation = () => {
//   return useMutation({
//     mutationKey: ["DeleteTagsToNote"],
//     mutationFn: async ({
//       idNote,
//       idTag,
//     }: {
//       idNote: Number;
//       idTag: Number;
//     }) => {
//       const response = await apiTaks.delete(`notes/${idNote}/tags/${idTag}`);
//       return response.data;
//     },
//   });
// };
