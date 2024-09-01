import { PostApiV1AuthLoginMutationRequest } from '@/api';
import { useAuthFunctions } from '@/components/Auth/useAuthFunctions';
import * as React from 'react';

export interface AuthContext {
	isAuthenticated: boolean;
	logout: ReturnType<typeof useAuthFunctions>['logout'];
	isLoading: boolean;
	login: (data: PostApiV1AuthLoginMutationRequest) => void;
	loginMutation: ReturnType<typeof useAuthFunctions>['loginMutation'];
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isFetching, login, logout, loginMutation } =
		useAuthFunctions();

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading: isFetching,
				logout,
				login,
				loginMutation,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
