"use client";

import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { t } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-xl overflow-hidden rounded-t-lg border-0 bg-[#ecfeff] p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 sm:m-auto sm:rounded-lg sm:border sm:border-cyan-200"
    >
      <div className="flex max-h-[92dvh] flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-cyan-200/80 bg-gradient-to-r from-cyan-100/90 via-cyan-50 to-purple-50/60 px-5 py-3.5">
          <h2
            id={titleId}
            className="text-lg font-black tracking-tight text-slate-950"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-cyan-200/90 bg-white/90 text-cyan-900 shadow-xs transition hover:bg-white hover:text-cyan-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 active:scale-95"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain bg-gradient-to-b from-[#ecfeff] to-[#e0f7fa]/70 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          {children}
        </div>
      </div>
    </dialog>
  );
}
