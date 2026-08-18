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
import type { GuidelineDto } from '../models/GuidelineDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GuidelineService {
    /**
     * Uploads a new guideline (JSON). A new identifier is generated server-side.
     * @param formData
     * @returns GuidelineDto The guideline was created.
     * @throws ApiError
     */
    public static postGuideline(
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<GuidelineDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/guideline',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `The file is missing or invalid.`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Returns the metadata of all uploaded guidelines.
     * @returns GuidelineDto Success.
     * @throws ApiError
     */
    public static getGuidelines(): CancelablePromise<Array<GuidelineDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guidelines',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Returns the metadata of a single guideline.
     * @param id The identifier of the guideline.
     * @returns GuidelineDto Success.
     * @throws ApiError
     */
    public static getGuideline(
        id: string,
    ): CancelablePromise<GuidelineDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guideline/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `No guideline exists with the given id.`,
            },
        });
    }
    /**
     * Replaces the file of an existing guideline. The guideline id is preserved.
     * @param id The identifier of the guideline to update.
     * @param formData
     * @returns GuidelineDto The guideline file was replaced.
     * @throws ApiError
     */
    public static putGuideline(
        id: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<GuidelineDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/guideline/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `The file is missing or invalid.`,
                401: `Unauthorized`,
                404: `No guideline exists with the given id.`,
            },
        });
    }
    /**
     * Deletes a guideline, its file, and notifies downstream services.
     * @param id The identifier of the guideline to delete.
     * @returns void
     * @throws ApiError
     */
    public static deleteGuideline(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/guideline/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `No guideline exists with the given id.`,
            },
        });
    }
    /**
     * Downloads the raw guideline file.
     * @param id The identifier of the guideline.
     * @returns binary Success.
     * @throws ApiError
     */
    public static getGuidelineFile(
        id: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/guideline/{id}/file',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `No guideline exists with the given id.`,
            },
        });
    }
}
