"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import Loader from "@/components/Status/Loader";
import ErrorMessage from "@/components/Status/ErrorMessage";
import EmptyState from "@/components/Status/EmptyState";

import css from "./page.module.css";

type NotesClientProps = {
  initialPage: number;
  initialTag?: string;
};

const NotesClient = ({ initialPage, initialTag = "" }: NotesClientProps) => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(initialPage);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch, initialTag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        perPage: 12,
        tag: initialTag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onChange={(selectedPage: number) => setPage(selectedPage)}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          !isLoading && !isError && <EmptyState />
        )}
      </main>
    </div>
  );
};

export default NotesClient;
