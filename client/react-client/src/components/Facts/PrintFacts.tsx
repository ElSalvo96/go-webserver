import { HandlerFactResponse, ResponseString } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { LoadingSpinner } from '@/components/ui/spinner';

type InputProps = {
	isError: boolean;
	error: ResponseString | null;
	data?: HandlerFactResponse[];
	isFetching: boolean;
	refetch: () => unknown;
};
export function PrintFacts({
	data,
	error,
	isError,
	isFetching,
	refetch,
}: InputProps) {
	return (
		<>
			<div className='p-4 grid gap-4 grid-cols-2 max-w-fit'>
				<h1 className='text-2xl col-span-2 row-span-1 text-center'>
					Gets Facts about dog{' '}
					{isFetching && <LoadingSpinner className='inline' />}
				</h1>
				{!isError && (
					<div className='col-span-2 row-span-1 my-12'>
						<Carousel
							opts={{
								align: 'start',
								loop: true,
							}}
							orientation='vertical'
							className='w-[300px]'
						>
							<CarouselContent className='-mt-1 h-[300px]'>
								{data?.map(({ id, text }) => (
									<CarouselItem key={id} className='pt-1 md:basis-1/2'>
										<div className='p-1'>
											<Card>
												<CardContent className='flex items-center justify-center p-6'>
													<span className='text-1xl font-semibold'>{text}</span>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
				)}
				{isError && (
					<p className='col-span-2 row-span-1'>{JSON.stringify(error)}</p>
				)}

				<Button
					onClick={() => {
						refetch();
					}}
					className='mt-8 col-start-2 col-span-1 row-span-1'
				>
					Refetch
				</Button>
			</div>
		</>
	);
}
