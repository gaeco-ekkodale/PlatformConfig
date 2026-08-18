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
import { useQuery } from "@tanstack/react-query";

export const ONTOLOGIES_QUERY_KEY = ["ontologies"] as const;

const useGetOntologies = () => {
  return useQuery<OntologyDto[]>({
    queryKey: ONTOLOGIES_QUERY_KEY,
    queryFn: () => OntologyService.getOntologies(),
  });
};

export default useGetOntologies;
