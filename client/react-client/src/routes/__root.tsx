import type { AuthContext } from '@/components/Auth/Auth';
import { Toaster } from '@/components/ui/toaster';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import './index.css';

interface RouterContext {
	auth: AuthContext;
}

const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				}))
			);

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			<Toaster />
			<Suspense>
				<TanStackRouterDevtools initialIsOpen={false} />
			</Suspense>
		</>
	),
});
