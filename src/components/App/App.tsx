import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import { useFetchNotes } from "../../hooks/useNotes";

const PER_PAGE = 10;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { data, isLoading, error, isError } = useFetchNotes({
    page,
    perPage: PER_PAGE,
    search: debouncedSearch,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages || 0}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {!isLoading && !isError && data && data.notes.length === 0 && (
        <p className={css.empty}>No notes found</p>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
