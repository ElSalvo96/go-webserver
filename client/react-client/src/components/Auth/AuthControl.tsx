import { useAuth } from '@/components/Auth/Auth';
import { toast } from '@/hooks/use-toast';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
const routeApi = getRouteApi('/login');
export function AuthControl() {
	const { isAuthenticated, loginMutation } = useAuth();
	const { redirect } = routeApi.useSearch();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: redirect || '/app' });
		}
	}, [isAuthenticated, redirect, navigate]);

	React.useEffect(() => {
		if (loginMutation.isError) {
			toast({
				title: 'You submitted the following values:',
				description: (
					<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
						<code className='text-white'>
							{JSON.stringify(loginMutation.error, null, 2)}
						</code>
					</pre>
				),
			});
		} else if (loginMutation.isSuccess) {
			toast({
				title: 'Response:',
				description: (
					<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
						<code className='text-white'>
							{JSON.stringify(loginMutation.data, null, 2)}
						</code>
					</pre>
				),
			});
		}
	}, [
		loginMutation.isError,
		loginMutation.error,
		loginMutation.isSuccess,
		loginMutation.data,
	]);

	return null;
}
