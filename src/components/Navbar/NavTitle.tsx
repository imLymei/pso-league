import Image from 'next/image';

export default function NavTitle() {
	return (
		<div className='flex items-center justify-center gap-2'>
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
			<p className='select-none'>Tabela PSO</p>
		</div>
	);
}
