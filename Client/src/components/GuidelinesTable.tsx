// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import { GuidelineDto, GuidelineService } from "@/api/guideline";
import useGetGuidelines from "../hooks/useGetGuidelines";
import useDeleteGuideline from "../hooks/useDeleteGuideline";
import useUpdateGuideline from "../hooks/useUpdateGuideline";
import ItemsTable from "./ItemsTable";
import { Typography } from "@mui/material";

const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString();
};

const guidelineColumns = [
  {
    key: "name" as const,
    label: "Name",
    render: (value: any) => (
      <Typography variant="body2" fontWeight={500}>
        {value ?? "—"}
      </Typography>
    ),
  },
  {
    key: "size" as const,
    label: "Size",
    render: (value: any) => (
      <Typography variant="body2" color="text.secondary">
        {value !== undefined ? formatSize(value) : "—"}
      </Typography>
    ),
  },
  {
    key: "updatedAt" as const,
    label: "Last Modified",
    render: (value: any) => (
      <Typography variant="body2" color="text.secondary">
        {formatDate(value)}
      </Typography>
    ),
  },
];

const GuidelinesTable = () => {
  const { data: guidelines, isLoading, isError } = useGetGuidelines();
  const deleteMutation = useDeleteGuideline();
  const updateMutation = useUpdateGuideline();

  return (
    <ItemsTable<GuidelineDto>
      data={guidelines}
      isLoading={isLoading}
      isError={isError}
      itemName="Guideline"
      columns={guidelineColumns}
      format=".guideline"
      downloadFileName={(item: GuidelineDto) => item.fileName ?? `${item.name ?? "guideline"}.guideline`}
      getItemFile={GuidelineService.getGuidelineFile}
      replaceWarningMessage={(item: GuidelineDto) => (
        <>
          Replacing <strong>{item.name}</strong> may change or remove classifications and
          properties. Access rights that reference removed entries will be automatically deleted.
        </>
      )}
      deleteMutation={deleteMutation}
      updateMutation={updateMutation}
    />
  );
};

export default GuidelinesTable;
