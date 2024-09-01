import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import the generated route tree
import { AuthProvider } from '@/components/Auth/Auth';
import { QueryClientSetup } from '@/components/QueryClientSetup';
import { RouterSetup } from '@/components/RouterSetup';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientSetup>
			<AuthProvider>
				<RouterSetup />
			</AuthProvider>
		</QueryClientSetup>
	</StrictMode>
);
