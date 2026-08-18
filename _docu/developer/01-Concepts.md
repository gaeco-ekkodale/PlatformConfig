# Concepts

This document describes the main concepts used in the PlatformConfig Client.

## Micro-Frontend

The PlatformConfig Client can be understood as a client for the Ontology Service and the Guideline Service upload endpoints. It is designed as a micro-frontend. To be able to use it, it can be uploaded into the `PluginHost` using the `PluginManager`. It can also be started locally if your Keycloak Client is configured correctly.

## Ontology Upload

A new Ontology file can be uploaded via an input field.

## Guideline Upload

A new Guideline file can be uploaded via an input field.

## Authentication and Authorization

Authentication and authorization are handled by Keycloak. The `PluginHost` authenticates the user and then requests an access token specifically for the `platform-config` Plugin by making a token exchange with the user token. The plugin can then use this token to authorize the user with it the Ontology and Guideline Service.