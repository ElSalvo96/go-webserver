import { unlinkSync } from 'node:fs';

// Get args
const filePath = process.argv[2];
const baseUrl = process.argv[3];

const fileToWrite = `
import axios from 'axios';
export const axiosClient = axios.create({
	baseURL: '${baseUrl}',
	withCredentials: true,
});
export default axiosClient;
`;

async function main() {
	const file = Bun.file(filePath, { type: 'w' });
	if (await file.exists()) unlinkSync(filePath);

	const writer = file.writer();
	writer.write(fileToWrite);
	writer.flush();
	writer.end();
}

main();
