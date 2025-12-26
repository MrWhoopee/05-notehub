import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useDeleteNote } from "../../hooks/useNotes";

export default function NoteList({ notes }: { notes: Note[] }) {
  const mutation = useDeleteNote();

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
