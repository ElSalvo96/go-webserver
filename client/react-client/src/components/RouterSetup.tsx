import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { useAuth } from '@/components/Auth/Auth';
import { routeTree } from '../routeTree.gen';

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		auth: undefined!, // This will be set after we wrap the app in an AuthProvider
	},
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export const RouterSetup = () => {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
};
