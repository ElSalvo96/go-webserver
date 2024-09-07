import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTanstackQuery } from '@kubb/swagger-tanstack-query';
import { pluginTs } from '@kubb/swagger-ts';

export default defineConfig(async () => {
	const sw = await fetch(process.env.VITE_SERVER_ADDRESS_SWAGGER || '').then(
		(res) => res.json()
	);
	return {
		root: '.',
		input: {
			data: sw,
			// path: './petStore.yaml',
		},
		output: {
			path: './src/api',
			clean: true,
		},
		hooks: {
			done: `bun run create-axios-client.ts ./src/api/axios-client.ts`,
		},
		plugins: [
			pluginOas(),
			pluginTs(),
			pluginTanstackQuery({
				client: { importPath: '../axios-client' },

				output: {
					path: './hooks',
				},
				// group: {
				// 	type: 'tag',
				// 	output: './hooks/{{tag}}Hooks',
				// },
				framework: 'react',
				dataReturnType: 'data',
				// mutate: {
				// 	variablesType: 'hook',
				// 	methods: ['post', 'put', 'delete'],
				// },
				// infinite: {
				// 	queryParam: 'next_page',
				// 	initialPageParam: 0,
				// 	cursorParam: 'nextCursor',
				// },
				// query: {
				// 	methods: ['get'],
				// 	importPath: '@tanstack/react-query',
				// },
				suspense: {},
			}),
		],
	};
});
