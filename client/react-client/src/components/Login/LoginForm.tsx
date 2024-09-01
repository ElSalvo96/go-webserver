import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const InputUsername = () => {
	return (
		<FormField
			// control={form.control}
			name='username'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input placeholder='Username' {...field} />
					</FormControl>
					<FormDescription>This is your public display name.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
export const InputPassword = () => {
	return (
		<FormField
			// control={form.control}
			name='password'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Password</FormLabel>
					<FormControl>
						<Input placeholder='password' {...field} type='password' />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
