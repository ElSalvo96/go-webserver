import { codegen } from 'swagger-axios-codegen';
codegen({
	methodNameMode: 'operationId',
	remoteUrl: 'http://localhost:8080/swagger/doc.json',
});
