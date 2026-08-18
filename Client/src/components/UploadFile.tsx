// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import { useState, useRef, useEffect } from "react";
import { Alert, Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "../context/PluginContext";

export interface UploadVariables {
  fileName: string;
  file: { file?: Blob | undefined };
}

interface UploadProps {
  fileName: string;
  format: string;
  isPending: boolean;
  isError: boolean;
  error?: Error | null;
  isSuccess: boolean;
  onUpload: (file: File) => void;
  successMessage?: string;
  getFileWarning?: (file: File, context?: any) => string | null;
}

const formatFileSize = (size: number): string => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const UploadFile = ({ fileName, format, isPending, isError, error, isSuccess, onUpload, successMessage, getFileWarning }: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileWarning, setFileWarning] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (isError) showSnackbar(`Upload failed: ${error?.message ?? String(error)}`, "error");
  }, [isError]);

  useEffect(() => {
    if (isSuccess) showSnackbar(successMessage ?? "File uploaded successfully!", "success");
  }, [isSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileWarning(getFileWarning ? getFileWarning(file) : null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length === 1) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFileWarning(getFileWarning ? getFileWarning(file) : null);
      e.dataTransfer.clearData();
    } else if (e.dataTransfer.files.length > 1) {
      showSnackbar("Please drop only one file at a time.", "error");
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFile(null);
    setFileWarning(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (selectedFile) onUpload(selectedFile);
  };

  const inputId = `${fileName.toLowerCase()}-upload-input`;

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        component="label"
        htmlFor={inputId}
        onDragOver={(e: React.DragEvent<HTMLElement>) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 160,
          p: 3,
          border: "2px dashed",
          borderColor: dragOver ? "primary.main" : "divider",
          borderRadius: 2,
          bgcolor: dragOver ? "action.hover" : "grey.50",
          cursor: isPending ? "default" : "pointer",
          pointerEvents: isPending ? "none" : undefined,
          transition: "border-color 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: "action.hover",
          },
        }}
      >
        <input
          id={inputId}
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept={format}
          onChange={handleFileChange}
          disabled={isPending}
        />

        {isPending ? (
          <CircularProgress size={36} />
        ) : selectedFile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
            <InsertDriveFileOutlinedIcon
              sx={{ fontSize: 40, color: "primary.main", flexShrink: 0 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {selectedFile.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(selectedFile.size)}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleRemoveFile} sx={{ flexShrink: 0 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Typography variant="body2" fontWeight={500}>
              Click to upload or drag & drop
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              {format}
            </Typography>
          </>
        )}
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        disabled={!selectedFile || isPending}
        onClick={handleUpload}
      >
        {isPending ? "Uploading…" : "Upload"}
      </Button>

      {fileWarning && (
        <Alert severity="warning">
          {fileWarning}
        </Alert>
      )}
    </Box>
  );
};

export default UploadFile;
