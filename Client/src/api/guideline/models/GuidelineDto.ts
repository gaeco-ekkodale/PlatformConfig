// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents the metadata of an uploaded guideline returned to API clients.
 */
export type GuidelineDto = {
    /**
     * The unique identifier of the guideline.
     */
    id?: string;
    /**
     * The display name of the guideline (derived from the file name).
     */
    name?: string | null;
    /**
     * The original uploaded file name including its extension.
     */
    fileName?: string | null;
    /**
     * The content type (MIME type) of the stored file.
     */
    contentType?: string | null;
    /**
     * The size of the stored file in bytes.
     */
    size?: number;
    /**
     * The ETag of the stored file.
     */
    etag?: string | null;
    /**
     * The timestamp when the guideline was first uploaded.
     */
    createdAt?: string;
    /**
     * The timestamp when the guideline file was last replaced.
     */
    updatedAt?: string;
};

