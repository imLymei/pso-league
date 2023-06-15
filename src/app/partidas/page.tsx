'use client';

import TeamBadge from '@/components/partidas/TeamBadge';
import { cn, supabase } from '@/utils/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BsArrowDownShort } from 'react-icons/bs';

export default function Partidas() {
	const [matches, setMatches] = useState<Match[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [whoIsOpen, setWhoIsOpen] = useState(-1);

	const notFoundTeam: Team = {
		id: -1,
		name: 'Nao Encontrado',
		players: [],
		captain: '',
		owner: '',
	};

	async function getMatches() {
		let { data: matches, error } = await supabase.from('matches').select('*');

		if (!error) {
			//@ts-ignore
			setMatches(matches);
		}
	}

	async function getTeams() {
		let { data: teams, error } = await supabase.from('teams').select('*');

		if (!error) {
			//@ts-ignore
			setTeams(teams);
		}
	}

	useEffect(() => {
		getTeams();
		getMatches();
	}, []);

	return (
		<div className='flex flex-col gap-4 overflow-y-auto p-4'>
			{matches.map((match, index) => {
				const home = teams.find((team) => team.id == match.home);
				const away = teams.find((team) => team.id == match.away);

				return (
					<div
						key={index}
						onClick={() => (whoIsOpen == match.id ? setWhoIsOpen(-1) : setWhoIsOpen(match.id))}
						className={cn(
							'grid cursor-pointer grid-cols-3 justify-items-center gap-y-4 overflow-hidden rounded-lg border border-black p-2 dark:border-white',
							{ 'h-20': whoIsOpen != match.id }
						)}>
						<TeamBadge team={home ? home : notFoundTeam} />
						<div className='relative flex items-center justify-center'>
							<p>{match.results}</p>
							<BsArrowDownShort
								className={cn('absolute -bottom-1 rotate-0 transition', {
									'rotate-180': whoIsOpen == match.id,
								})}
								size={25}
							/>
						</div>
						<TeamBadge team={away ? away : notFoundTeam} />
						<div className='flex flex-col'>
							{match.home_scores?.map((scorer, index) => (
								<Link
									href={`/jogadores/${scorer}`}
									className='text-blue-500 hover:text-blue-600'
									key={`${scorer}-scorer-${home?.name}-${home?.id}-${match.id}-${index}`}>
									@{scorer}
								</Link>
							))}
						</div>
						<div></div>
						<div className='flex flex-col'>
							{match.away_scores?.map((scorer, index) => (
								<Link
									href={`/jogadores/${scorer}`}
									className='text-blue-500 hover:text-blue-600'
									key={`${scorer}-scorer-${away?.name}-${away?.id}-${match.id}-${index}`}>
									@{scorer}
								</Link>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
