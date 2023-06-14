'use client';

import { supabase } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TbArrowBadgeUp } from 'react-icons/tb';

export default function Times() {
	const [teams, setTeams] = useState<team[]>([]);

	async function getTeams() {
		let { data: teams, error } = await supabase.from('teams').select('*');

		if (!error) {
			//@ts-ignore
			setTeams([...teams]);
		}
	}

	useEffect(() => {
		getTeams();
	}, []);

	return (
		<div>
			<div className=' grid grid-cols-3 gap-4 p-4'>
				{teams.map((team) => (
					<div
						key={team.id}
						className='flex flex-col justify-between gap-4 rounded-lg border border-black p-4 dark:border-white'>
						<div className='flex'>
							<div className='relative aspect-square h-full'>
								<Image
									src={team.image ? team.image : '/images/badge-placeholder.png'}
									alt={`${team.name} Logo`}
									fill
									className='object-contain'
								/>
							</div>
							<div className='flex flex-col'>
								<p className='text-2xl'>{team.name}</p>
								<Link
									href={`/jogadores/${team.owner}`}
									className='w-fit text-sm text-blue-500 decoration-solid transition hover:text-blue-600'>
									@{team.owner}
								</Link>
							</div>
						</div>
						{team.description && (
							<div className='flex flex-col gap-2'>
								<p>Descrição:</p>
								<p className='w-1/2 text-sm'>{team.description}</p>
							</div>
						)}
						<div className='flex flex-col gap-2'>
							<p>Jogadores:</p>
							{team.players.map((player, index) => (
								<div key={index} className='flex w-fit items-center transition hover:translate-x-2'>
									<Link href={`/jogadores/${player}`}>@{player}</Link>
									{team.captain == player ? <TbArrowBadgeUp className='text-blue-500' size={20} /> : null}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
