// Interfaz para los tags
export interface Tag {
  id: number;
  name: string;
}

// Interfaz para las notas
export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  userId: number;
  tags: Tag[];
}

//Interfaz para crear una nota
export interface CreateNoteInterface {
  title: string;
  content: string;
  archived: boolean;
  userId: number;
  tags?: Tag[];
}

//Interfaz para los tags
export interface Tag {
  id: number;
  name: string;
}
