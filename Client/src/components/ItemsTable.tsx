// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TableCellProps,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "../context/PluginContext";
import UploadFile from "./UploadFile";
import { UseMutationResult } from "@tanstack/react-query";

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sx?: TableCellProps["sx"];
}

export interface ItemsTableProps<
  T extends { id?: string; name?: string | null; fileName?: string | null },
> {
  data?: T[];
  isLoading: boolean;
  isError: boolean;
  itemName: string;
  columns: ColumnConfig<T>[];
  format: string;
  downloadFileName: (item: T) => string;
  getItemFile: (id: string) => Promise<Blob>;
  replaceWarningMessage: (item: T) => React.ReactNode;
  deleteMutation: UseMutationResult<void, Error, string>;
  updateMutation: any;
  getFileWarning?: (file: File, item?: T) => string | null;
}

const headerCellSx = {
  color: "text.secondary",
  fontWeight: 600,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  py: 1.5,
  borderBottom: "1px solid",
  borderColor: "divider",
};

function ItemsTable<T extends { id?: string; name?: string | null; fileName?: string | null }>(
  props: ItemsTableProps<T>
) {
  const {
    data,
    isLoading,
    isError,
    itemName,
    columns,
    format,
    downloadFileName,
    getItemFile,
    replaceWarningMessage,
    deleteMutation,
    updateMutation,
    getFileWarning,
  } = props;

  const showSnackbar = useSnackbar();
  const [replaceTarget, setReplaceTarget] = useState<T | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      setReplaceTarget(null);
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const handleCloseReplaceDialog = () => {
    if (updateMutation.isPending) return;
    setReplaceTarget(null);
    updateMutation.reset();
  };

  const handleDownload = async (item: T) => {
    if (!item.id) return;
    try {
      const blob = await getItemFile(item.id);
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = downloadFileName(item);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      showSnackbar(`Download failed: ${error}`, "error");
    }
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete?.id) return;
    const id = itemToDelete.id;
    deleteMutation.mutate(id, {
      onSuccess: () => showSnackbar(`${itemName} deleted.`, "success"),
      onError: (error) => showSnackbar(`Delete failed: ${error.message}`, "error"),
    });
    setItemToDelete(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Failed to load {itemName.toLowerCase()}s.
      </Typography>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              {columns.map((col) => (
                <TableCell key={String(col.key)} sx={{ ...headerCellSx, ...col.sx }}>
                  {col.label}
                </TableCell>
              ))}
              <TableCell sx={{ ...headerCellSx, textAlign: "right" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{ py: 6, color: "text.disabled" }}
                >
                  No {itemName.toLowerCase()}s uploaded yet.
                </TableCell>
              </TableRow>
            ) : (
              data.map((entry) => (
                <TableRow key={entry.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} sx={col.sx}>
                      {col.render
                        ? col.render(entry[col.key], entry)
                        : typeof entry[col.key] === "string" ||
                            typeof entry[col.key] === "number"
                          ? String(entry[col.key] ?? "—")
                          : "—"}
                    </TableCell>
                  ))}
                  <TableCell align="right" sx={{ py: 0.5 }}>
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title="Replace file">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => entry.id && setReplaceTarget(entry)}
                        >
                          <SwapHorizIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton size="small" onClick={() => handleDownload(entry)}>
                          <FileDownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setItemToDelete(entry)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Replace dialog */}
      <Dialog
        open={replaceTarget !== null}
        onClose={updateMutation.isPending ? undefined : handleCloseReplaceDialog}
        disableEscapeKeyDown={updateMutation.isPending}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Replace {itemName.toLowerCase()}
          <IconButton
            onClick={handleCloseReplaceDialog}
            size="small"
            disabled={updateMutation.isPending}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {replaceTarget && (
            <Alert severity="warning" sx={{ mx: 3, mt: 1, mb: 0 }}>
              {replaceWarningMessage(replaceTarget)}
            </Alert>
          )}
          <UploadFile
            fileName={itemName}
            format={format}
            isPending={updateMutation.isPending}
            isError={updateMutation.isError}
            error={updateMutation.error}
            isSuccess={updateMutation.isSuccess}
            successMessage={`${itemName} replaced successfully!`}
            getFileWarning={(file) => getFileWarning ? getFileWarning(file, replaceTarget || undefined) : null}
            onUpload={(file) => {
              if (!replaceTarget?.id) return;
              updateMutation.mutate({ id: replaceTarget.id, file: { file } } as any);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={itemToDelete !== null}
        onClose={deleteMutation.isPending ? undefined : () => setItemToDelete(null)}
        disableEscapeKeyDown={deleteMutation.isPending}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete {itemName.toLowerCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Are you sure you want to delete{" "}
            <strong>{itemToDelete?.name ?? itemToDelete?.fileName}</strong>?
          </DialogContentText>
          <Alert severity="error" sx={{ mt: 1 }}>
            This action cannot be undone and will notify other services.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setItemToDelete(null)} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ItemsTable;
