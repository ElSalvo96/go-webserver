import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

export const LoadingSpinner = React.forwardRef<
	SVGSVGElement,
	React.HTMLAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => (
	<Loader className={cn('animate-spin', className)} {...props} ref={ref} />
));
