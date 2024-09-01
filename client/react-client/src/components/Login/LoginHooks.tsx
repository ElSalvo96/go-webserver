import { useAuth } from '@/components/Auth/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const formSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});

export const useFormLogin = () => {
	const { loginMutation, login } = useAuth();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		login(data);
	}

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isLoadingLogin: loginMutation.isPending || form.formState.isSubmitting,
	};
};
