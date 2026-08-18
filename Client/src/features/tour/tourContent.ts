// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import {TourPanel} from "./Tour";

export const TOUR_KEY = "platformconfig";
export const TOUR_MODULE_NAME = "Platform Config";

/**
 * Describes this module and its place in gaeco - nothing beyond it. No pointers to other
 * modules or to tools outside the platform.
 *
 * Kept as data, not JSX, so the wording can be revised without touching a component.
 */
export const TOUR_PANELS: TourPanel[] = [
  {
    title: "The shared data model",
    body: "Everything in gaeco refers to a shared data model: it decides which kinds of objects exist and how they may be connected. This module is where that model lives.",
  },
  {
    title: "The guideline: what exists",
    body: "It defines the classifications — the object types you work with, such as portfolio, building, floor and space — and the properties each of them carries.",
  },
  {
    title: "The ontology: how things connect",
    body: "It declares which relationships are permitted between those classifications, for example that a building has floors. Only connections the ontology allows can be created later.",
  },
  {
    title: "Uploading a model",
    body: "Select the Guideline or Ontology tab and choose +. Guidelines are .guideline files, ontologies are Turtle (.ttl). Everything uploaded is listed in the table below.",
  },
  {
    title: "Replacing and removing",
    body: "“Replace file” overwrites an entry in place. If the new file no longer contains a classification or property, the access rights referring to it are removed along with it. Each row also offers Download and Delete.",
  },
];
