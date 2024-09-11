export interface Note {
  id: number;
  content: string;
  deadline: string;
  createdAt: Date;
}

export interface FormData {
  content: string;
  deadline: string;
}

export interface NoteListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export interface NoteItemsProps {
  id: number;
  content: string;
  deadline: string;
  createdAt: Date;

  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}
