import { MetaFunction } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, type ActionFunctionArgs, json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { isRouteErrorResponse, useActionData, useLoaderData, useRouteError } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const allNotes = await getStoredNotes();
  if (allNotes.length === 0) {
    throw json({ message: 'Could not find notes' }, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return json({ notes: allNotes });
};


export const meta: MetaFunction = () => [
  {
    title: 'All notes',
  },
  {
    content: 'All your notes',
    property: 'description',
  }
];


export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { title, content } = Object.fromEntries(formData);

  if (title.toString().length < 5) {
    return { message: 'Invalid title. Too short' };
  }
  const allNotes = await getStoredNotes();
  const id = new Date().toISOString();
  const updatedNotes = [...allNotes, {
    title: title.toString(),
    content: content.toString(),
    id
  }];
  await storeNotes(updatedNotes);
  return redirect('/notes');
};

export const links: LinksFunction = () => (
  [
    ...newNoteLinks(),
    ...noteListLinks(),
  ]
);

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <main>
      <NewNote error={actionData?.message} />
      <NoteList notes={data.notes} />
    </main>
  );
}

export function ErrorBoundary(){
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <div className="error">
      <h2>Error in notes page happened</h2>
      {error instanceof Error && (
        <p>{error.message}</p>
      )}
    </div>
  )
}
