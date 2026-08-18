// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntologyService } from "@/api/ontology";
import { ONTOLOGIES_QUERY_KEY } from "./useGetOntologies";

const useDeleteOntology = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await OntologyService.deleteOntology(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ONTOLOGIES_QUERY_KEY });
    },
  });
};

export default useDeleteOntology;
