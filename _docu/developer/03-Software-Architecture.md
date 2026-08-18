# Software Architecture

This document describes the software architecture of the PlatformConfig Client.

## Overview

The PlatformConfig Client consists only of a frontend client. It is implemented using TypeScript + React.

## Frontend Architecture

The frontend is a single-page application (SPA). It uses the following components:

- **App**: The root component of the application.
- **StandaloneApp**: The root component of the application if working locally without pluginhost.
- **Components**: Reusable components that also include client logic.
- **Pages**: The pages as children of App or StandaloneApp.
- **Services / API Clients**: The API clients that communicate with the backend.
- **Hooks**: Mainly reusable Tanstack Query code for data mutation.

## Communication

The frontend communicates with the Ontology and Guideline Services via REST API.