// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import { OntologyDto, OntologyService } from "@/api/ontology";
import useGetOntologies from "../hooks/useGetOntologies";
import useDeleteOntology from "../hooks/useDeleteOntology";
import useUpdateOntology from "../hooks/useUpdateOntology";
import ItemsTable from "./ItemsTable";
import { Chip, Typography } from "@mui/material";

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

const ontologyColumns = [
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
    key: "format" as const,
    label: "Format",
    render: (value: any) =>
      value ? (
        <Chip label={value.toUpperCase()} size="small" variant="outlined" sx={{ fontSize: "0.7rem", height: 22 }} />
      ) : (
        "—"
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

const OntologiesTable = () => {
  const { data: ontologies, isLoading, isError } = useGetOntologies();
  const deleteMutation = useDeleteOntology();
  const updateMutation = useUpdateOntology();

  const getFormatWarning = (file: File, ontology?: OntologyDto): string | null => {
    if (!ontology?.format) return null;

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const currentFormat = ontology.format.toLowerCase();

    if (fileExt && fileExt !== currentFormat) {
      return `Warning: The current ontology uses .${currentFormat} format, but you're uploading a .${fileExt} file. This may cause compatibility issues.`;
    }
    return null;
  };

  return (
    <ItemsTable<OntologyDto>
      data={ontologies}
      isLoading={isLoading}
      isError={isError}
      itemName="Ontology"
      columns={ontologyColumns}
      format=".ttl, .rdf"
      downloadFileName={(item: OntologyDto) =>
        item.fileName ?? `${item.name ?? "ontology"}.${item.format ?? "ttl"}`
      }
      getItemFile={OntologyService.getOntologyFile}
      replaceWarningMessage={(item: OntologyDto) => (
        <>
          Replacing <strong>{item.name}</strong> may affect dependent services and
          classifications. This action will notify other services of the change.
        </>
      )}
      deleteMutation={deleteMutation}
      updateMutation={updateMutation}
      getFileWarning={getFormatWarning}
    />
  );
};

export default OntologiesTable;
