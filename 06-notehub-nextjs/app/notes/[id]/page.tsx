import { NoteDetails } from './NoteDetails.client';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface PageProps {
  params: { id: string };
}

export default async function NotePage({ params }: PageProps) {
  const queryClient = new QueryClient();

  const noteId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}