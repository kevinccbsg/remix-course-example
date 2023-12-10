import { redirect, type LoaderFunctionArgs, json } from "@remix-run/node";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes.server";
import styles from '~/styles/note-details.css';

export const links: LinksFunction = () => (
  [
    { rel: 'stylesheet', href: styles },
  ]
);


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const allNotes = await getStoredNotes();
  const note = allNotes.find(note => note.id === params.noteId);
  if (!note) {
    return redirect('/not-found');
  }
  return json(note);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  {
    title: data?.title,
  },
  {
    content: data?.title,
    property: 'description',
  }
];


export default function NoteDetail(){
  const data = useLoaderData<typeof loader>()
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
      </header>
      <h1>{data.title}</h1>
      <p id="note-details-content">{data.content}</p>
    </main>
  );
}