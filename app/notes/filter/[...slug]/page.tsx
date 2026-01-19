import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  const currentTag = slug && slug[0] !== "all" ? slug[0] : "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", currentTag],
    queryFn: () => fetchNotes({ page: 1, search: "", tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={1} initialTag={currentTag} />
    </HydrationBoundary>
  );
}
