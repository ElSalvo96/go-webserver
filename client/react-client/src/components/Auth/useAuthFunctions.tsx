import {
	getApiV1AuthIsloggedinQueryKey,
	useGetApiV1AuthIsloggedin,
	useGetApiV1AuthLogout,
	usePostApiV1AuthLogin,
} from '@/api';
import { queryClient } from '@/components/QueryClientSetup';
import * as React from 'react';

export function useAuthFunctions() {
	const {
		isFetching,
		data,
		refetch: refetchIsLoggedIn,
	} = useGetApiV1AuthIsloggedin({
		query: {
			enabled: false,
			retry: false,
		},
	});
	const loginMutation = usePostApiV1AuthLogin();

	const isAuthenticated =
		data?.data === true || loginMutation.data?.data === true;

	const { refetch } = useGetApiV1AuthLogout({
		query: {
			enabled: false,
		},
	});

	const logout = React.useCallback(async () => {
		await queryClient.invalidateQueries({
			queryKey: getApiV1AuthIsloggedinQueryKey(),
			exact: true,
		});
		loginMutation.reset();

		return refetch();
	}, [loginMutation, refetch]);

	React.useEffect(() => {
		refetchIsLoggedIn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		logout,
		login: loginMutation.mutate,
		isAuthenticated,
		isFetching,
		loginMutation,
	};
}
