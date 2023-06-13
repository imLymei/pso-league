import { cn } from '@/utils/utils';
import Link from 'next/link';

interface LinkProps {
	href: string;
	pathname: string;
	title: string;
}

export default function Links({ href, pathname, title }: LinkProps) {
	const condition = pathname == href.split('/')[1];

	return (
		<Link href={href} draggable={false}>
			<p className={cn('select-none transition', { 'scale-110': condition })}>{title}</p>
			<div
				className={cn('h-px w-full scale-0 bg-black transition duration-300 dark:bg-white', {
					'scale-110': condition,
				})}
			/>
		</Link>
	);
}
