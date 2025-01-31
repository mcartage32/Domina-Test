export interface RegistrationInterface {
  username: string;
  password: string;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface UserInterface {
  id: number;
  username: string;
  password: string;
}

export type UserWithoutPassword = Omit<UserInterface, "password">;

export interface LoginResponse {
  success: boolean;
  user?: UserWithoutPassword;
}

export interface TaskInterface {
  id: number;
  title: string;
  description: string;
}

export interface CreateTaskInterface {
  userId: number;
  title: string;
  description: string;
}

// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   archived: boolean;
//   userId: number;
//   tags: Tag[];
// }

// export interface CreateNoteInterface {
//   title: string;
//   content: string;
//   archived: boolean;
//   userId: number;
//   tags?: Tag[];
// }

// export interface Tag {
//   id: number;
//   name: string;
// }
