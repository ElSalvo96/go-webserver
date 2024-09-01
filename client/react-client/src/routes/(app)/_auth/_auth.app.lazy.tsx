import { LoadingSpinner } from '@/components/ui/spinner';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(app)/_auth/_auth/app')({
	component: () => <div>Hello /_app/app!</div>,
	pendingComponent: () => <LoadingSpinner />,
});
