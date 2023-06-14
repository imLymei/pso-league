import Image from 'next/image';
import Link from 'next/link';

export default function NavTitle() {
	return (
		<Link href={'/'} className='flex items-center justify-center gap-2'>
			<div className='relative aspect-square h-10 overflow-hidden rounded-full border border-white'>
				<Image
					src={'/images/logo-icon.png'}
					alt='PSO Logo'
					fill
					priority
					draggable={false}
					className='object-contain'
				/>
			</div>
			<p className='select-none'>PSO League</p>
		</Link>
	);
}
