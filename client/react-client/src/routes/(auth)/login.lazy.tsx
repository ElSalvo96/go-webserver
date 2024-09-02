import { AuthControl } from '@/components/Auth/AuthControl';
import { Login } from '@/components/Login/Login';
import { MainContainer } from '@/components/MainContainer';
import { LoadingSpinner } from '@/components/ui/spinner';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/login')({
	component: () => (
		<MainContainer>
			<AuthControl />
			<Login />
		</MainContainer>
	),
	pendingComponent: () => (
		<MainContainer>
			<LoadingSpinner />
		</MainContainer>
	),
});
