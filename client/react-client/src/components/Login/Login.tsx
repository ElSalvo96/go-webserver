import { useAuth } from '@/components/Auth/Auth';
import { InputPassword, InputUsername } from '@/components/Login/LoginForm';
import { useFormLogin } from '@/components/Login/LoginHooks';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Login() {
	const { form, onSubmit, isLoadingLogin } = useFormLogin();
	const { isAuthenticated, isLoading } = useAuth();
	if (isLoading || isAuthenticated) return <LoadingSpinner />;

	return (
		<Tabs defaultValue='account' className='w-[400px]'>
			<TabsList className='grid w-full grid-cols-1'>
				<TabsTrigger value='account'>Login</TabsTrigger>
				{/* <TabsTrigger value='password'>Forgot Password?</TabsTrigger> */}
			</TabsList>
			<TabsContent value='account'>
				<Form {...form}>
					<form onSubmit={onSubmit}>
						<Card>
							<CardHeader>
								<CardTitle>Log in to your account</CardTitle>
								<CardDescription>
									Enter your credentials to access your account.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<InputUsername />
								<InputPassword />
							</CardContent>
							<CardFooter>
								<Button type='submit' className='w-full' size='lg'>
									{isLoadingLogin && (
										<LoadingSpinner className='mr-2 h-4 w-4' />
									)}
									Log In
								</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</TabsContent>
			{/* <TabsContent value='password'>
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='current'>Current password</Label>
							<Input id='current' type='password' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='new'>New password</Label>
							<Input id='new' type='password' />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent> */}
		</Tabs>
	);
}
