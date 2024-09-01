'use client';

import { useAuth } from '@/components/Auth/Auth';
import {
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenu as NavigationMenuUi,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, useNavigate } from '@tanstack/react-router';

export function NavigationMenu() {
	return (
		<NavigationMenuUi>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link to='/app' className={navigationMenuTriggerStyle()}>
						App
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
			<NavigationMenuList className='ml-auto'>
				<LogoutButton />
			</NavigationMenuList>
		</NavigationMenuUi>
	);
}

const LogoutButton = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	return (
		<NavigationMenuItem className=''>
			<NavigationMenuLink
				onClick={() => logout().then(() => navigate({ to: '/login' }))}
				className={navigationMenuTriggerStyle()}
			>
				Logout
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
};
