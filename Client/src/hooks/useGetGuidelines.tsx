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
import { useQuery } from "@tanstack/react-query";

export const GUIDELINES_QUERY_KEY = ["guidelines"] as const;

const useGetGuidelines = () => {
  return useQuery<GuidelineDto[]>({
    queryKey: GUIDELINES_QUERY_KEY,
    queryFn: () => GuidelineService.getGuidelines(),
  });
};

export default useGetGuidelines;
