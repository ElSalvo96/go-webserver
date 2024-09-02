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
		<header className='sticky top-0 z-40 bg-slate-950 flex justify-between'>
			<NavigationMenuUi>
				<NavigationMenuList className='min-w-full'>
					<NavigationMenuItem>
						<Link to='/app' className={navigationMenuTriggerStyle()}>
							App
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link to='/facts/dogs' className={navigationMenuTriggerStyle()}>
							Facts about dogs
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link to='/facts/cats' className={navigationMenuTriggerStyle()}>
							Facts about cats
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenuUi>
			<NavigationMenuUi>
				<NavigationMenuList className='ml-auto'>
					<LogoutButton />
				</NavigationMenuList>
			</NavigationMenuUi>
		</header>
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
