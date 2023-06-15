'use client';

import { cn, supabase } from '@/utils/utils';
import React, { useContext, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setPlayerContext } from '@/utils/context';

type Inputs = {
	name: string;
	number: string;
	image: string;
};

export default function EditForm({ player }: { player: Player }) {
	const [isEditing, setIsEditing] = useState(false);

	const setPlayer = useContext(setPlayerContext);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => updatePlayer(data);

	async function updatePlayer(inputs: Inputs) {
		const { data, error } = await supabase.from('players').update(inputs).eq('user_id', player.user_id);

		if (setPlayer) {
			setPlayer((player) => {
				if (player) {
					let newPlayer = player;

					newPlayer.name = inputs.name;
					newPlayer.image = inputs.image;
					newPlayer.number = parseInt(inputs.number);

					console.log(newPlayer);

					return newPlayer;
				} else {
					return null;
				}
			});
		}

		setIsEditing(false);
	}

	return (
		<>
			<div className='absolute right-20 top-20'>
				<BsPencilSquare
					onClick={() => {
						setIsEditing((value) => !value);
						setValue('name', player.name);
						setValue('number', player.number.toString());
						setValue('image', player.image ? player.image : '');
					}}
					className='peer cursor-pointer'
				/>
				<div className=' absolute -translate-x-full select-none whitespace-nowrap opacity-0 transition peer-hover:opacity-100'>
					Editar Perfil
				</div>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cn(
					'absolute left-1/2 top-1/2 z-20 flex flex h-96 w-80 -translate-x-1/2 -translate-y-1/2 flex-col flex-col items-center gap-4 rounded-lg border border-black bg-white p-2 dark:border-white dark:bg-black',
					{
						hidden: !isEditing,
					}
				)}>
				<p className='text-xl'>Editar Perfil</p>
				<div className='flex flex-col'>
					<label htmlFor='name'>Nome</label>
					<input
						id='name'
						className='rounded-sm border border-black bg-transparent p-1 outline-none dark:border-white'
						maxLength={20}
						placeholder='Jhon Doe'
						{...register('name')}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='number'>Numero</label>
					<input
						id='number'
						className='rounded-sm border border-black bg-transparent p-1 outline-none dark:border-white'
						maxLength={3}
						placeholder='123'
						{...register('number')}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='image'>Imagem (URL)</label>
					<input
						id='image'
						type='url'
						className='rounded-sm border border-black bg-transparent p-1 outline-none dark:border-white'
						placeholder='Jhon Doe'
						{...register('image')}
					/>
				</div>
				<button>Enviar</button>
			</form>
		</>
	);
}
