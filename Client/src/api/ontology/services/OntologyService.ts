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
import type { OntologyDto } from '../models/OntologyDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OntologyService {
    /**
     * Uploads a new ontology
     * Uploads an ontology turtle- or rdf-file, stores it, and creates its metadata. A new id is generated.
     * @param formData
     * @returns OntologyDto Created
     * @throws ApiError
     */
    public static uploadOntology(
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<OntologyDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Ontology',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Lists all ontologies
     * Returns metadata for all uploaded ontologies.
     * @returns OntologyDto Success
     * @throws ApiError
     */
    public static getOntologies(): CancelablePromise<Array<OntologyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Ontologies',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Gets a single ontology
     * Returns the metadata of the ontology with the given id.
     * @param id
     * @returns OntologyDto Success
     * @throws ApiError
     */
    public static getOntology(
        id: string,
    ): CancelablePromise<OntologyDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Ontology/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Replaces an ontology file
     * Overwrites the file of an existing ontology and notifies downstream services.
     * @param id
     * @param formData
     * @returns OntologyDto Success
     * @throws ApiError
     */
    public static updateOntology(
        id: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<OntologyDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Ontology/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Deletes an ontology
     * Deletes the ontology metadata and file and notifies downstream services.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteOntology(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Ontology/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Downloads the ontology file
     * Returns the raw stored ontology file (turtle or rdf).
     * @param id
     * @returns binary Success
     * @throws ApiError
     */
    public static getOntologyFile(
        id: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Ontology/{id}/file',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
}
