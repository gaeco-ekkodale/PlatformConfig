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
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import GuidelinesTable from "../components/GuidelinesTable";
import OntologiesTable from "../components/OntologiesTable";
import UploadFile from "../components/UploadFile";
import useUploadGuideline from "../hooks/useUploadGuideline";
import useUploadOntology from "../hooks/useUploadOntology";
import Tour from "../features/tour/Tour";
import {TOUR_KEY, TOUR_MODULE_NAME, TOUR_PANELS} from "../features/tour/tourContent";

const ConfigPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [guidelineUploadOpen, setGuidelineUploadOpen] = useState(false);
  const [ontologyUploadOpen, setOntologyUploadOpen] = useState(false);
  const uploadGuidelineMutation = useUploadGuideline();
  const uploadOntologyMutation = useUploadOntology();

  useEffect(() => {
    if (uploadGuidelineMutation.isSuccess) setGuidelineUploadOpen(false);
  }, [uploadGuidelineMutation.isSuccess]);

  useEffect(() => {
    if (uploadOntologyMutation.isSuccess) setOntologyUploadOpen(false);
  }, [uploadOntologyMutation.isSuccess]);

  const handleCloseGuidelineDialog = () => {
    if (uploadGuidelineMutation.isPending) return;
    setGuidelineUploadOpen(false);
    uploadGuidelineMutation.reset();
  };

  const handleCloseOntologyDialog = () => {
    if (uploadOntologyMutation.isPending) return;
    setOntologyUploadOpen(false);
    uploadOntologyMutation.reset();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Tour tourKey={TOUR_KEY} moduleName={TOUR_MODULE_NAME} panels={TOUR_PANELS} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs centered value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          <Tab label="Guideline" />
          <Tab label="Ontology" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={600}>
              Guidelines
            </Typography>
            <IconButton color="primary" onClick={() => setGuidelineUploadOpen(true)}>
              <AddIcon />
            </IconButton>
          </Box>

          <GuidelinesTable />

          <Dialog
            open={guidelineUploadOpen}
            onClose={uploadGuidelineMutation.isPending ? undefined : handleCloseGuidelineDialog}
            disableEscapeKeyDown={uploadGuidelineMutation.isPending}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              Upload Guideline
              <IconButton
                onClick={handleCloseGuidelineDialog}
                size="small"
                disabled={uploadGuidelineMutation.isPending}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <UploadFile
                fileName="Guideline"
                format=".guideline"
                isPending={uploadGuidelineMutation.isPending}
                isError={uploadGuidelineMutation.isError}
                error={uploadGuidelineMutation.error}
                isSuccess={uploadGuidelineMutation.isSuccess}
                onUpload={(file) =>
                  uploadGuidelineMutation.mutate({ fileName: "guideline", file: { file } })
                }
              />
            </DialogContent>
          </Dialog>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={600}>
              Ontologies
            </Typography>
            <IconButton color="primary" onClick={() => setOntologyUploadOpen(true)}>
              <AddIcon />
            </IconButton>
          </Box>

          <OntologiesTable />

          <Dialog
            open={ontologyUploadOpen}
            onClose={uploadOntologyMutation.isPending ? undefined : handleCloseOntologyDialog}
            disableEscapeKeyDown={uploadOntologyMutation.isPending}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              Upload Ontology
              <IconButton
                onClick={handleCloseOntologyDialog}
                size="small"
                disabled={uploadOntologyMutation.isPending}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <UploadFile
                fileName="Ontology"
                format=".ttl,.rdf"
                isPending={uploadOntologyMutation.isPending}
                isError={uploadOntologyMutation.isError}
                error={uploadOntologyMutation.error}
                isSuccess={uploadOntologyMutation.isSuccess}
                onUpload={(file) =>
                  uploadOntologyMutation.mutate({ fileName: "ontology", file: { file } })
                }
              />
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default ConfigPage;
