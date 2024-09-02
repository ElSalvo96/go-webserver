import { useGetHeartbeat } from '@/api';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/spinner';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(app)/_auth/_auth/app')({
	component: () => <Component />,
	pendingComponent: () => <LoadingSpinner />,
});

const Component = () => {
	const { isError, error, data, isLoading, isFetching, refetch } =
		useGetHeartbeat();

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='p-4 grid gap-2 grid-cols-2'>
			<h1 className='text-2xl col-span-2 row-span-1'>
				Server Heartbeat {isFetching && <LoadingSpinner className='inline' />}
			</h1>
			<p className='col-span-2 row-span-1'>
				{isError ? JSON.stringify(error) : data?.data}
			</p>

			<Button
				onClick={() => {
					refetch();
				}}
				className='mt-8 col-start-2  col-span-1 row-span-1'
			>
				Refetch
			</Button>
		</div>
	);
};
