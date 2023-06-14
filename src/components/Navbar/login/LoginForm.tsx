'use client';

import { cn, supabase } from '@/utils/utils';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	email: string;
	password: string;
};

export default function LoginForm({
	className,
	setSession,
}: {
	className: string;
	setSession: Dispatch<SetStateAction<Session | null>>;
}) {
	const [error, setError] = useState<string | null>(null);
	const [hasError, setHasError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const registerUser: SubmitHandler<Inputs> = async (formData) => {
		let { data, error } = await supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		});

		if (error) {
			console.log(error.message);
			setError(error.message);
			setHasError(true);
		} else {
			setSession(data.session);
		}
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setHasError(false);
			}, 3000);
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	}, [error]);

	return (
		<form
			onSubmit={handleSubmit(registerUser)}
			className={`top-0 flex flex-col gap-4 rounded-lg border border-black bg-white p-2 after:absolute after:-top-2 after:right-0 after:h-4 after:w-4 after:-translate-x-1/2 after:rotate-45 after:border-l after:border-t after:border-black after:bg-white after:transition after:content-[""] dark:border-white dark:bg-black dark:after:border-white dark:after:bg-black max-sm:after:-translate-x-3/4 sm:after:left-1/2 ${className}`}>
			<div className='flex flex-col'>
				<div className='relative flex'>
					<p>Email</p>
					<p className='peer/email cursor-pointer p-1 text-red-500'>*</p>
					<p className='absolute -left-2 top-2 origin-top-right -translate-x-full scale-0 rounded-l-lg border border-black p-2 opacity-0 transition peer-hover/email:scale-100 peer-hover/email:opacity-100 dark:border-white'>
						O e-mail precisa ser um e-mail válido.
					</p>
				</div>
				<input
					type='email'
					placeholder='eu@contato.com'
					className='rounded-lg border border-black bg-transparent p-1 outline-none invalid:text-red-500 dark:border-white'
					required
					{...register('email')}
				/>
			</div>

			<div className='flex flex-col'>
				<div className='relative flex'>
					<p>Senha</p>
					<p className='peer/password cursor-pointer p-1 text-red-500'>*</p>
					<p className='absolute -left-2 top-2 origin-top-right -translate-x-full scale-0 rounded-l-lg border border-black p-2 opacity-0 transition peer-hover/password:scale-100 peer-hover/password:opacity-100 dark:border-white'>
						A senha precisa conter pelo menos 6 dígitos, com um número e uma letra.
					</p>
				</div>
				<input
					type='password'
					placeholder='@1234-5678'
					className='rounded-lg border border-black bg-transparent p-1 outline-none invalid:text-red-500 dark:border-white'
					minLength={6}
					required
					pattern='(?=.*\d)(?=.*[a-z]).{6,}'
					{...register('password')}
				/>
			</div>
			<button className='rounded-lg border border-black p-2 transition hover:bg-black/10 dark:border-white dark:hover:bg-white/20'>
				entrar
			</button>
			<div
				className={cn(
					'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-red-500 opacity-0 transition',
					{ 'opacity-100': hasError }
				)}>
				{error}
			</div>
		</form>
	);
}
