import { FactsAboutDogs } from '@/components/Facts/FactsAboutDogs';
import { LoadingSpinner } from '@/components/ui/spinner';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(app)/_auth/facts/dogs')({
	component: () => <FactsAboutDogs />,
	pendingComponent: () => <LoadingSpinner />,
});
