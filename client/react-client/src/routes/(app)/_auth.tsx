import { MainContainer } from '@/components/MainContainer';
import { NavigationMenu } from '@/components/NavigationMenu';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_auth')({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: '/login',
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: AuthLayout,
	pendingComponent: () => <LoadingSpinner />,
});

function AuthLayout() {
	return (
		<>
			<NavigationMenu />
			<MainContainer>
				<Outlet />
			</MainContainer>
		</>
	);
}
