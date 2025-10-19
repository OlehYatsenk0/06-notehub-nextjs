import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['note', params.id],
      queryFn: () => fetchNoteById(params.id),
    });
  } catch (error) {
    console.error('SSR Prefetch failed:', error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}