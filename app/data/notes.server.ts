interface Note {
  id: string;
  title: string;
  content: string;
}

let notes: Note[] = [];

export async function getStoredNotes() {
  return notes as Note[];
}

export function storeNotes(newNotes: Note[]) {
  notes = [...notes, ...newNotes];
  return;
}
