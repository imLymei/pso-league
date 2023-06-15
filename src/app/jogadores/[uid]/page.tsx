'use client';

import { useState, useEffect, useContext } from 'react';
import { cn, supabase, toDecimal } from '@/utils/utils';
import { AiOutlineLoading } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import useMouse from '@/hooks/useMouse';
import useWindow from '@/hooks/useWindow';
import { playerContext } from '@/utils/context';
import EditForm from '@/components/jogadores/EditForm';

interface Params {
	uid: string;
}

export default function UserPage({ params }: { params: Params }) {
	const [pagePlayer, setPagePlayer] = useState<Player | null>();
	const [pageTeam, setPageTeam] = useState<Team>();
	const [isLoading, setIsLoading] = useState(true);
	const [css, setCss] = useState<string>();

	const player = useContext(playerContext);

	const mousePosition = useMouse();
	const windowSize = useWindow();

	async function getPlayer() {
		let { data: players, error } = await supabase.from('players').select('*').eq('user_id', params.uid);

		if (players?.length == 0) {
			setPagePlayer(null);
		} else {
			//@ts-ignore
			setPagePlayer(players[0]);

			//@ts-ignore
			getTeam(players[0].user_id);
		}
	}

	async function getTeam(user_id: string) {
		let { data: teams, error } = await supabase.from('teams').select('*').contains('players', [user_id]);

		if (teams?.length != 0) {
			//@ts-ignore
			setPageTeam(teams[0]);
		}
	}

	useEffect(() => {
		getPlayer().finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		if (mousePosition.x && windowSize.width) {
			switch (toDecimal(mousePosition.x / windowSize.width, 2)) {
				case 0.1:
					setCss('sm:skew-y-[-4deg]');
					break;
				case 0.15:
					setCss('sm:skew-y-[-3.5deg]');
					break;
				case 0.2:
					setCss('sm:skew-y-[-3.1deg]');
					break;
				case 0.25:
					setCss('sm:skew-y-[-2.6deg]');
					break;
				case 0.3:
					setCss('sm:skew-y-[-2.2deg]');
					break;
				case 0.35:
					setCss('sm:skew-y-[-1.7deg]');
					break;
				case 0.4:
					setCss('sm:skew-y-[-1.3deg]');
					break;
				case 0.45:
					setCss('sm:skew-y-[-0.8deg]');
					break;
				case 0.5:
					setCss('sm:skew-y-[-0.4deg]');
					break;
				case 0.55:
					setCss('sm:skew-y-[0deg]');
					break;
				case 0.6:
					setCss('sm:skew-y-[0.4deg]');
					break;
				case 0.65:
					setCss('sm:skew-y-[0.8deg]');
					break;
				case 0.7:
					setCss('sm:skew-y-[1.3deg]');
					break;
				case 0.75:
					setCss('sm:skew-y-[1.7deg]');
					break;
				case 0.8:
					setCss('sm:skew-y-[2.2deg]');
					break;
				case 0.85:
					setCss('sm:skew-y-[2.6deg]');
					break;
				case 0.9:
					setCss('sm:skew-y-[3.1deg]');
					break;
				case 0.95:
					setCss('sm:skew-y-[3.5deg]');
					break;
				case 1:
					setCss('sm:skew-y-[4deg]');
					break;
				default:
					break;
			}
		}
	}, [mousePosition, windowSize]);

	return (
		<div className={cn('flex min-h-[80vh] flex-col items-center justify-center p-4')}>
			{pagePlayer != null && player != null && pagePlayer.user_id == player.user_id && (
				<EditForm player={pagePlayer} />
			)}
			{isLoading ? (
				<AiOutlineLoading className='animate-spin' size={25} />
			) : pagePlayer == null ? (
				<p>Usuário nao encontrado</p>
			) : (
				<>
					<div
						className={cn(
							'skew-y-0 select-none overflow-hidden rounded-lg border border-black dark:border-white',
							css
						)}>
						<div className='absolute aspect-square w-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-500/50 to-65% bg-contain bg-no-repeat' />
						<div className='absolute aspect-square w-[800px] bg-gradient-radial from-purple-500/50 to-65% bg-contain bg-no-repeat' />
						<div className='p-4'>
							<div className='relative aspect-square w-72 overflow-hidden rounded-full border border-black dark:border-white'>
								<Image
									src={pagePlayer.image ? pagePlayer.image : '/images/user-placeholder.jpg'}
									draggable={false}
									alt={`${pagePlayer.name} Image`}
									fill
									className='object-contain'
								/>
							</div>
							<div className='text-center'>
								<p className='text-xl'>~ {pagePlayer.name} ~</p>
								<p className='text-sm text-blue-500'>@{pagePlayer.user_id}</p>
							</div>
						</div>
						<div className='h-px w-full bg-black/20 dark:bg-white/20' />
						<div className='p-4 text-center'>
							<p className='text-xl'>Sobre mim:</p>
							<div className='flex justify-center gap-2'>
								<p>{pageTeam?.name}</p>
								{pageTeam?.tag ? (
									<>
										<p>-</p>
										<Link href={`/times#${pageTeam.tag}`} className='text-blue-500 hover:text-blue-600'>
											#{pageTeam.tag}
										</Link>
									</>
								) : (
									''
								)}
							</div>
							<div className='flex justify-center gap-2'>
								<p>Camisa {pagePlayer.number}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
