import Image from 'next/image';

export default function TeamBadge({ team }: { team: Team }) {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='relative aspect-square h-10'>
				<Image
					src={team?.image ? team.image : '/images/badge-placeholder.png'}
					alt={`${team?.name}`}
					fill
					className='object-contain'
				/>
			</div>
			<p className='font-semibold'>{team?.name}</p>
		</div>
	);
}
