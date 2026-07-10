"use client";

import { useRef } from "react";
import { ARCHIVO_TAMANO_MAXIMO_MB } from "@/lib/constants";
import { validateFileMeta } from "@/lib/validations/file.schema";
import styles from "./Form.module.css";

type FileUploadProps = {
  file: File | null;
  onChange: (file: File | null, error?: string) => void;
  error?: string;
};

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function FileUpload({ file, onChange, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    const selected = fileList?.[0];

    if (!selected) {
      onChange(null);
      return;
    }

    const validation = validateFileMeta({
      name: selected.name,
      size: selected.size,
      type: selected.type,
    });

    if (!validation.ok) {
      onChange(null, validation.error);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    onChange(selected);
  }

  return (
    <div>
      <div
        className={`${styles.fileDropzone} ${file ? styles.fileDropzoneHasFile : ""}`}
      >
        {file ? (
          <>
            <p className={styles.fileName}>{file.name}</p>
            <p className={styles.fileSize}>{formatSize(file.size)}</p>
          </>
        ) : (
          <p className={styles.hint} style={{ margin: 0 }}>
            Word (.doc, .docx) o PDF, hasta {ARCHIVO_TAMANO_MAXIMO_MB}MB.
          </p>
        )}

        <label className={styles.fileInputLabel} htmlFor="file-upload">
          {file ? "Cambiar archivo" : "Elegir archivo"}
        </label>
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept=".doc,.docx,.pdf"
          className={styles.visuallyHidden}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
