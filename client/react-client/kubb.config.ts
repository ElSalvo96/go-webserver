import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTanstackQuery } from '@kubb/swagger-tanstack-query';
import { pluginTs } from '@kubb/swagger-ts';

// Get args
const baseUrl = process.argv[4];

export default defineConfig(async () => {
	const swagger = await fetch(`${baseUrl}/swagger/doc.json`).then((res) =>
		res.json()
	);
	// export default client.create({ baseURL: 'http://localhost:8080' });

	return {
		root: '.',
		input: {
			data: swagger,
			// path: './petStore.yaml',
		},
		output: {
			path: './src/api',
			clean: true,
		},
		hooks: {
			done: `bun run create-axios-client.ts ./src/api/axios-client.ts ${baseUrl}`,
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
