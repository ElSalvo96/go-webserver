import { readFileSync, readdirSync, watch } from 'node:fs';
import { join } from 'node:path';

const fileRoot = './api/docs';

const getFileHash = (filename: string) => {
	const fileBuffer = readFileSync(filename);
	const hash = Bun.hash(fileBuffer);
	return hash;
};

// Recursive fill the hashmap with the contents of the files at the start of the process
const fileHashes = (() => {
	const fileHashes = new Map<string, number | bigint>();
	for (const filename of readdirSync(fileRoot)) {
		const fullPath = join(fileRoot, filename);
		const newHash = getFileHash(fullPath);
		fileHashes.set(fullPath, newHash);
		console.log('On looking for changes', fullPath);
	}

	return fileHashes;
})();

const onFilesChange = () => {
	let isAnyFileChanged = false;
	for (const filename of readdirSync(fileRoot)) {
		const fullPath = join(fileRoot, filename);
		const newHash = getFileHash(fullPath);
		const oldHash = fileHashes.get(fullPath);
		if (oldHash !== newHash) {
			console.log(`Real change detected in ${fullPath}, reloading...`);
			isAnyFileChanged = true;
			fileHashes.set(fullPath, newHash);
		}
	}

	if (isAnyFileChanged) {
		console.log('Changes detected on files, reloading swagger...');
		// Run command for generating the docs
		Bun.spawn(['bun', 'run', 'generateApi'], {
			stdout: 'inherit',
			stderr: 'inherit',
		});
	}
};

let timeout: Timer | undefined;
const watcher = watch('./api/docs', (event, filename) => {
	if (!filename) return;
	if (event === 'change') {
		console.log(`File ${filename} changed`);
		// Debounce the function to avoid too many api calls
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			onFilesChange();
		}, 500);
	}
});

// To stop watching
process.on('SIGINT', () => {
	console.log('Closing watcher...');
	watcher.close();
	process.exit(0);
});
