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
import { UploadVariables } from "../components/UploadFile";
import { GuidelineService } from "@/api/guideline";
import { GUIDELINES_QUERY_KEY } from "./useGetGuidelines";

const useUploadGuideline = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, UploadVariables>({
    mutationFn: async ({ file }: UploadVariables) => {
      return await GuidelineService.postGuideline(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUIDELINES_QUERY_KEY });
    },
  });
};

export default useUploadGuideline;
