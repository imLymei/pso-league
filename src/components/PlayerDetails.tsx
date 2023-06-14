'use client';

import { sessionContext } from '@/utils/context';
import { supabase } from '@/utils/utils';
import { useState, useEffect, useRef, useContext, Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineLoading } from 'react-icons/ai';

type Inputs = {
	name: string;
	number: number;
	user_id: string;
};

export default function PlayerDetails({
	setPlayer,
	setChoosingName,
}: {
	setPlayer: Dispatch<SetStateAction<player | null>>;
	setChoosingName: Dispatch<SetStateAction<boolean>>;
}) {
	const [isUserIdFree, setIsUserIdFree] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [timeOutId, setTimeOutId] = useState(null);

	const userId = useRef<HTMLInputElement>(null);

	const session = useContext(sessionContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const addPlayer: SubmitHandler<Inputs> = async (formData) => {
		if (session) {
			const playerName = formData.name.trim().slice(0, 21);
			const shirtNumber = parseInt(formData.number.toString().slice(0, 3));
			const playerUserId = userId.current?.value.trim().toLowerCase();

			supabase
				.from('players')
				.insert([{ name: playerName, number: shirtNumber, email: session.user.email, user_id: playerUserId }])
				.then(() =>
					supabase
						.from('players')
						.select('*')
						.eq('email', session.user.email)
						.then(({ data: players, error }) => {
							if (players?.length != 0) {
								//@ts-ignore
								setPlayer(players[0]);
							}
						})
				);

			setChoosingName(false);

			console.log(formData);
		}
	};

	function searchUserId() {
		if (timeOutId != null) {
			clearTimeout(timeOutId);
		}

		setIsUserIdFree(false);

		const playerUserId = userId.current?.value.trim().toLowerCase();

		if (playerUserId && playerUserId?.length >= 3) {
			setIsLoading(true);
			const id = setTimeout(() => {
				supabase
					.from('players')
					.select('*')
					.eq('user_id', playerUserId)
					.then(({ data: players, error }) => {
						console.log(players);
						if (players?.length == 0) {
							console.log('Free USER NAME');
							setIsUserIdFree(true);
						} else {
							console.log('Ocupied USER NAME');
							setIsUserIdFree(false);
						}
						setIsLoading(false);
					});
			}, 1500);
			//@ts-ignore
			setTimeOutId(id);
		} else {
			setIsLoading(false);
		}
	}

	return (
		<div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
			<form
				onSubmit={handleSubmit(addPlayer)}
				className='flex flex-col items-center gap-4 rounded-lg border border-black bg-white p-4 dark:border-white dark:bg-black'>
				<p className='text-center text-4xl'>Seja bem vindo!</p>
				<div className='text-xl'>
					<p>Voce esta a um passo de se tornar um jogador!</p>
					<p>agora escolha seu nome e numero da camisa!</p>
				</div>
				<div className='flex w-2/3 items-center justify-between gap-2'>
					<label>Nome:</label>
					<input
						{...register('name')}
						maxLength={20}
						required
						minLength={3}
						placeholder='Jhon Doe'
						className='rounded-lg border border-black p-1 text-black outline-none dark:border-white dark:bg-black dark:text-white'
					/>
				</div>
				<div className='flex w-2/3 items-center justify-between gap-2'>
					<label>Número:</label>
					<input
						{...register('number')}
						type='number'
						required
						placeholder='12'
						className='rounded-lg border border-black p-1 text-black outline-none dark:border-white dark:bg-black dark:text-white'
					/>
				</div>
				<div className='relative w-2/3 rounded-lg border border-black px-2 text-black outline-none dark:border-white dark:bg-black dark:text-white'>
					<label>@</label>
					<input
						{...register('user_id')}
						maxLength={12}
						required
						placeholder='jhondoe'
						ref={userId}
						onChange={searchUserId}
						className='bg-transparent p-1 outline-none'
					/>
					<div className='absolute right-2 top-1/2 -translate-y-1/2'>
						{userId.current?.value.length! >= 3 ? (
							isLoading ? (
								<AiOutlineLoading className='animate-spin' />
							) : isUserIdFree ? (
								<AiFillCheckCircle />
							) : (
								<AiFillCloseCircle />
							)
						) : (
							''
						)}
					</div>
				</div>
				<button
					disabled={!isUserIdFree}
					className='rounded-lg border border-black px-4 py-2 hover:bg-black/10 disabled:cursor-not-allowed disabled:text-slate-600 dark:border-white dark:hover:bg-white/10'>
					Virar um jogador!
				</button>
			</form>
		</div>
	);
}
