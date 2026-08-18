# Introduction

This document will guide you through the installation steps to start the PlatformConfig user interface.

# Prerequisites

- Ensure that the application `Docker Desktop` is running.
  - `MiniO`
  - `Kafka`
  - `PluginHost Service`
  - `AppOrchestrator`
  - `Ontology Service`
  - `Guideline Service`
- Make sure that `Node.js` version 11.4.1 or higher is installed on your computer.

# Technical Guide 

The Platform Config user interface consists only of a microfrontend plugin. 
If you previously used the `start-all.bat` for project setup, you can ignore the following instructions and continue with [starting the client](#starting-the-client).

- Navigate to `Gaeco/PlatformConfig/Client`. 
- Open your command line interface within your current working directory. On Windows, you can use either the `Terminal` or `PowerShell` by right-clicking while holding the `Shift` key and selecting the option that corresponds to your command line interface.
- Execute `npm i` and `npm run build:devlocal`. This will generate the plugin files inside `Gaeco/PlatformConfig/Client/dist`. 
- Now please follow these instructions for [starting the client](#starting-the-client).

## Starting the Client

There are two supported ways to run the PlatformConfig Client:

1. Local development mode
2. Containerized client integrated by the AppOrchestrator

### Local development mode

- Navigate to `Client`.
- Open your command line interface within your current working directory. On Windows, you can use either the `Terminal` or `PowerShell` by right-clicking while holding the `Shift` key and selecting the option that corresponds to your command line interface.
- Execute `npm i`.
- Execute `npm run dev`.

This starts the client locally with the configured development environment. Use this mode when you actively work on the frontend.

### Containerized client via AppOrchestrator

- Ensure that the `platformconfig-client` container is running.
- The AppOrchestrator discovers the microfrontend metadata from the container labels and binds the client into the Plugin Host automatically.

This mode is the standard runtime setup when you want the client to appear inside the Plugin Host without a manual upload step.

If one of these two setups is active, you are ready to use the PlatformConfig Client.