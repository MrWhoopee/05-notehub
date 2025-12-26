import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote, deleteNote, fetchNotes } from "../services/noteService";

interface UseFetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const useFetchNotes = ({
  page,
  perPage,
  search,
}: UseFetchNotesParams) => {
  return useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
    placeholderData: keepPreviousData,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
