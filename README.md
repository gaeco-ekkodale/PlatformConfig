<div align="center">
  <img src="https://raw.githubusercontent.com/gaeco-ekkodale/.github/main/assets/gaeco_logo_horizontal_color.png" width="200" alt="gaeco logo">

  # PlatformConfig

  <em>Admin micro-frontend for uploading and managing the platform's guidelines and ontologies.</em>

  [![License](https://img.shields.io/badge/license-fair--code-blue.svg)](LICENSE.md)
  [![Version](https://img.shields.io/github/v/release/gaeco-ekkodale/PlatformConfig)](../../releases)

  [gaeco-ekkodale Organization](https://github.com/gaeco-ekkodale) · [All Repos](https://github.com/orgs/gaeco-ekkodale/repositories)
</div>

---

gaeco (Graphs for Architecture, Engineering, Construction, Operations) is an event-driven microservice platform for BIM data management. It translates external building-industry standards (IFC, IBPDI, Brick Schema, ASHRAE 223 and others) into a shared, versioned classification and relationship model (Guideline + Ontology) and exposes consistent, graph-based building data (Instance) across use cases and departments — without forcing every consumer onto one rigid schema. Built for organizations managing building/portfolio data across disconnected departmental systems (construction, facilities management, leasing, accounting) that need automatic, reliable data propagation instead of manual, error-prone hand-offs.

> This project is licensed under the [Source Available](LICENSE.md). Source code is viewable and usable; commercial use is restricted.

---

An admin UI, delivered as a micro-frontend, mainly used to upload a guideline or an ontology for
gaeco. Uploads go to the [GuidelineService](https://github.com/gaeco-ekkodale/GuidelineService) and
[OntologyService](https://github.com/gaeco-ekkodale/OntologyService) respectively.

## Project Structure

- **Client**: Frontend React application for managing plugins
- **build**: Build configuration using NUKE build system
- **_pipeline**: CI/CD pipeline configurations

## Development Setup

### Prerequisites

- Node.js (v16+)
- .NET SDK (v8.0+)

### Local Development

1. Navigate to the Client directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The development server will be available at `http://localhost:3003`.

## Deployment Instructions

### Building for Deployment

To build the plugin for deployment to dev or test environments:

1. Configure environment variables:
   - Edit `Client/.env.production` and set the correct API URL:
     ```
     VITE_API_URL=https://your-api-domain.com
     ```

2. Update the Vite federation configuration:
   - Open `Client/vite.config.ts`
   - Modify the `remotes` configuration to point to your host application:
     ```typescript
     remotes: {
       host: "https://your-host-app.com/assets/remoteEntry.js",
     },
     ```

3. Build the plugin:
   ```bash
   cd Client
   npm run build
   ```

4. The built files will be available in the `Client/dist/assets` directory. These files need to be deployed to your server.

### CI/CD Pipeline

The project includes Azure DevOps pipeline configuration in the `_pipeline` directory that can be used for automated builds and deployments.

To execute the build using the NUKE build system:

```bash
./build.sh    # On Linux/macOS
.\build.ps1   # On Windows
```

## Security

The application uses OIDC authentication with Keycloak. Make sure the appropriate configurations are set in both development and production environments.
