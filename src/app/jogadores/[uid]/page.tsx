'use client';

import { useState, useEffect } from 'react';
import { cn, supabase } from '@/utils/utils';
import { AiOutlineLoading } from 'react-icons/ai';

interface Params {
	uid: string;
}

export default function UserPage({ params }: { params: Params }) {
	const [pagePlayer, setPagePlayer] = useState<Player | null>();
	const [isLoading, setIsLoading] = useState(true);

	async function getPlayer() {
		let { data: players, error } = await supabase.from('players').select('*').eq('user_id', params.uid);

		if (players?.length == 0) {
			setPagePlayer(null);
		} else {
			//@ts-ignore
			setPagePlayer(players[0]);
		}
	}

	useEffect(() => {
		getPlayer().finally(() => setIsLoading(false));
	}, []);

	return (
		<div
			className={cn('flex min-h-[90vh] flex-col items-center', {
				'justify-center': isLoading || pagePlayer == null,
			})}>
			{isLoading ? (
				<AiOutlineLoading size={50} className='animate-spin' />
			) : pagePlayer == null ? (
				<p>Usuário nao encontrado</p>
			) : (
				<p>@{pagePlayer.user_id}</p>
			)}
		</div>
	);
}
