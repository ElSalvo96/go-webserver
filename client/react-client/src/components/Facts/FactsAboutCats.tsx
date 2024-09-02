import { useGetApiV1FactsCats } from '@/api';
import { PrintFacts } from '@/components/Facts/PrintFacts';
import { LoadingSpinner } from '@/components/ui/spinner';

export function FactsAboutCats() {
	const { isError, error, data, isLoading, isFetching, refetch } =
		useGetApiV1FactsCats({
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
