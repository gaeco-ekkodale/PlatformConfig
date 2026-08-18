// Copyright (c) 2025 Ekkodale GmbH. All rights reserved.
//
// This file is part of the gaeco platform system.
//
// Use of this file is governed by the terms of the license
// in LICENSE.md at the root of this repository.
// Unauthorized copying, modification, distribution, or use of this file,
// via any medium, is strictly prohibited except as expressly permitted
// under that license.

import { useAuth } from 'react-oidc-context'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ConfigPage from './pages/ConfigPage'
import { OpenAPI as GuidelineAPI } from '@api/guideline/core/OpenAPI'
import { OpenAPI as OntologyAPI } from '@api/ontology/core/OpenAPI'
import './index.css'
import { PluginContextProvider } from './context/PluginContext'
import { PluginProps } from './context/PluginProps'

// set API-URLs from environment variables
OntologyAPI.BASE = import.meta.env.VITE_ONTOLOGY_API_URL
GuidelineAPI.BASE = import.meta.env.VITE_GUIDELINE_API_URL

function App(pluginProps: PluginProps) {
	const auth = useAuth()
	const setTokens = (value: string | undefined) => {
		OntologyAPI.TOKEN = value
		GuidelineAPI.TOKEN = value
	}
	setTokens(auth.user?.access_token)

	useEffect(() => {
		if (auth.user?.access_token) {
			setTokens(auth.user?.access_token)
		} else {
			setTokens(undefined)
		}
	}, [auth])

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<PluginContextProvider pluginProps={pluginProps}>
				<div>
					<Routes>
						<Route path='/*' element={<ConfigPage />} />
					</Routes>
				</div>
			</PluginContextProvider>
		</QueryClientProvider>
	)
}

export default App
