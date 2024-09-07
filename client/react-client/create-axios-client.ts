import { unlinkSync } from 'node:fs';

// Get args
const filePath = process.argv[2];

const fileToWrite = `
import axios from 'axios';
export const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_SERVER_ADDRESS,
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
