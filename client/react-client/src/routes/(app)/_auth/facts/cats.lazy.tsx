import { FactsAboutCats } from '@/components/Facts/FactsAboutCats';
import { LoadingSpinner } from '@/components/ui/spinner';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(app)/_auth/facts/cats')({
	component: () => <FactsAboutCats />,
	pendingComponent: () => <LoadingSpinner />,
});
