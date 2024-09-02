import { useGetApiV1FactsDogs } from '@/api';
import { PrintFacts } from '@/components/Facts/PrintFacts';
import { LoadingSpinner } from '@/components/ui/spinner';

export function FactsAboutDogs() {
	const { isError, error, data, isLoading, isFetching, refetch } =
		useGetApiV1FactsDogs({
			query: {
				staleTime: 60 * 1000,
			},
		});

	if (isLoading) return <LoadingSpinner />;

	return (
		<PrintFacts
			data={data?.data}
			error={error}
			isError={isError}
			isFetching={isFetching}
			refetch={refetch}
		/>
	);
}
