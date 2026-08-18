// ============================================================================
// Environment Variables
// ============================================================================
// Add new variables here.

// Variables required in production/Docker. Will be injected as placeholders
// at build time and replaced at Docker runtime via docker-compose.yml.
// All variables must have the VITE_ prefix.
export const ENV_SCHEMA = {
	VITE_MOUNT_PATH: null,
	VITE_GUIDELINE_API_URL: null,
	VITE_ONTOLOGY_API_URL: null,
} as const

// Variables only used in StandaloneApp (local development / standalone mode).
// StandaloneApp is NOT exported via module federation and therefore these
// variables do NOT need to be provided in Docker. Set them in .env.
export const DEV_ONLY_ENV_SCHEMA = {
	VITE_KEYCLOAK_AUTHORITY: null, // Must be set
	VITE_KEYCLOAK_CLIENT_ID: null, // Must be set
} as const

// ============================================================================
// Auto-generated TypeScript Types (Do not modify below this line)
// ============================================================================

export const ENV_KEYS = Object.keys(ENV_SCHEMA) as Array<keyof typeof ENV_SCHEMA>

type GeneratedEnv = {
	readonly [K in keyof typeof ENV_SCHEMA]: string
} & {
	readonly [K in keyof typeof DEV_ONLY_ENV_SCHEMA]: string
}

declare global {
	interface ImportMetaEnv extends GeneratedEnv {}
	interface ImportMeta {
		readonly env: ImportMetaEnv
	}
}

export {}
