import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
// Create a new query client
// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
	defaultOptions: {},
});

export const QueryClientSetup = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<React.Suspense fallback={null}>
				<ReactQueryDevtools initialIsOpen={false} />
			</React.Suspense>
		</QueryClientProvider>
	);
};
