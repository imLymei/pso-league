'use client';

import { cn, supabase } from '@/utils/utils';
import { data } from 'autoprefixer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsArrowDownShort } from 'react-icons/bs';
import { TbArrowBadgeUp } from 'react-icons/tb';

export default function Times() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [teamOpen, setTeamOpen] = useState(-1);

	async function getTeams() {
		let { data: teams, error } = await supabase.from('teams').select('*');

		getMatches().then((allMatches) => {
			const realTeams = teams
				?.map((data) => ({ ...data, data: getMyMatches(allMatches, data.id) }))
				.sort((a, b) => b.data.pts - a.data.pts);
			if (!error) {
				//@ts-ignore
				setTeams([...realTeams]);
			}
		});
	}

	async function getMatches() {
		let { data: matches, error } = await supabase.from('matches').select('*');
		//@ts-ignore
		return [...matches];
	}

	function getMyMatches(matches: Match[], teamId: number) {
		const myMatches = matches.filter((match) => match.home == teamId || match.away == teamId);

		let goals = 0;

		let wins = 0;
		let losses = 0;
		let ties = 0;

		myMatches.forEach((match) => {
			const results = match.results.split('x');

			if (teamId == match.home) {
				goals += parseInt(results[0]);
				if (results[0] > results[1]) {
					wins++;
				} else if (results[0] < results[1]) {
					losses++;
				} else {
					ties++;
				}
			} else {
				goals += parseInt(results[1]);
				if (results[1] > results[0]) {
					wins++;
				} else if (results[1] < results[0]) {
					losses++;
				} else {
					ties++;
				}
			}
		});

		const data: MatchData = {
			pts: wins * 3 + ties,
			pj: myMatches.length,
			v: wins,
			e: myMatches.reduce((total, match) => {
				const results = match.results.split('x');

				if (results[0] == results[1]) return total + 1;
				else return total;
			}, 0),
			d: losses,
			goals: goals,
		};
		return data;
	}

	useEffect(() => {
		getTeams();
	}, []);

	return (
		<div className='flex flex-col gap-4 p-4'>
			{teams.map((team) => (
				<div
					key={team.id}
					className={cn(
						'flex flex-col justify-between gap-4 overflow-hidden rounded-lg border border-black p-4 transition-all dark:border-white',
						{ 'h-20': teamOpen != team.id }
					)}>
					<div className='relative flex items-center'>
						<div className='relative aspect-square h-12'>
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
						<div className='absolute left-2/3 flex gap-x-4 max-sm:top-16 max-sm:flex-col sm:-translate-x-1/2'>
							<div className='grid grid-cols-2 items-center max-sm:w-24 sm:flex sm:flex-col sm:justify-center'>
								<p>PTS:</p>
								<p>{team.data?.pts}</p>
							</div>
							<div className='grid grid-cols-2 items-center max-sm:w-24 sm:flex sm:flex-col sm:justify-center'>
								<p>PJ:</p>
								<p>{team.data?.pj}</p>
							</div>
							<div className='grid grid-cols-2 items-center max-sm:w-24 sm:flex sm:flex-col sm:justify-center'>
								<p>V:</p>
								<p>{team.data?.v}</p>
							</div>
							<div className='grid grid-cols-2 items-center max-sm:w-24 sm:flex sm:flex-col sm:justify-center'>
								<p>E:</p>
								<p>{team.data?.e}</p>
							</div>
							<div className='grid grid-cols-2 items-center max-sm:w-24 sm:flex sm:flex-col sm:justify-center'>
								<p>D:</p>
								<p>{team.data?.d}</p>
							</div>
							<div className='grid grid-cols-2 items-center max-sm:w-24 sm:flex sm:flex-col sm:justify-center'>
								<p>Gols:</p>
								<p>{team.data?.goals}</p>
							</div>
						</div>
						<button
							onClick={() => (teamOpen == team.id ? setTeamOpen(-1) : setTeamOpen(team.id))}
							className={cn('p4 absolute right-4 top-4 rotate-0 transition', {
								'rotate-180': teamOpen == team.id,
							})}>
							<BsArrowDownShort size={25} />
						</button>
					</div>
					<div>{team.description && <p className='w-1/2 text-sm'>{team.description}</p>}</div>
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
	);
}
