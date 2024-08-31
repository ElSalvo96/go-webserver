import { LoginInput, Query } from './api/axios-client';

function App() {
	const loginMutation = Query.useLoginMutation();

	return (
		<button
			onClick={() => {
				const body = new LoginInput({
					username: 'foo',
					password: 'bar',
				});
				loginMutation.mutate(body);
			}}
		>
			Login
		</button>
	);
}

export default App;
