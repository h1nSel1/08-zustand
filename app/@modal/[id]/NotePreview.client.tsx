"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import css from "./NotePreview.client.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <NoteDetailsClient id={id} />
        </div>
      </div>
    </Modal>
  );
}
