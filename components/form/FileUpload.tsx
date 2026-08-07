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
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({ file, onChange, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

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

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    onChange(selected);
  }

  function handleRemoveFile() {
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div
        className={`${styles.fileDropzone} ${
          file ? styles.fileDropzoneHasFile : ""
        }`}
      >
        <div className={styles.fileIcon} aria-hidden="true">
          {file ? "✓" : "↑"}
        </div>

        {file ? (
          <div>
            <p className={styles.fileName}>{file.name}</p>
            <p className={styles.fileSize}>{formatSize(file.size)}</p>
          </div>
        ) : (
          <div>
            <p className={styles.fileDropTitle}>Arrastrá o elegí tu archivo</p>
            <p className={styles.hint}>
              Word (.doc / .docx) o PDF editable, hasta{" "}
              {ARCHIVO_TAMANO_MAXIMO_MB} MB.
            </p>
          </div>
        )}

        <div className={styles.fileActions}>
          <label className={styles.fileInputLabel} htmlFor="file-upload">
            {file ? "Cambiar archivo" : "Elegir archivo"}
          </label>

          {file && (
            <button
              type="button"
              className={styles.fileRemoveButton}
              onClick={handleRemoveFile}
            >
              Quitar
            </button>
          )}
        </div>

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
