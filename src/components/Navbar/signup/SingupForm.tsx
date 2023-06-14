'use client';

import { cn, supabase } from '@/utils/utils';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

export default function SignupForm({
	className,
	setSession,
}: {
	className: string;
	setSession: Dispatch<SetStateAction<Session | null>>;
}) {
	const [error, setError] = useState<string | null>(null);
	const [hasError, setHasError] = useState(false);
	const [isSuccess, setIsSuccess] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const registerUser: SubmitHandler<Inputs> = async (formData) => {
		if (formData.password != formData.confirmPassword) {
			setHasError(true);
			setError('As Senhas precisam ser iguais');
		} else {
			let { data, error } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			});

			if (error) {
				console.log(error.message);
				setError(error.message);
				setHasError(true);
			} else {
				setSession(data.session);
				setIsSuccess(formData.email);
			}
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
			className={`top-0 flex flex-col gap-4 rounded-lg border border-black bg-white p-2 shadow-sm shadow-black/50 after:absolute after:-top-2 after:left-3/4 after:h-4 after:w-4 after:-translate-x-1/2 after:rotate-45 after:border-l after:border-t after:border-black after:bg-white after:transition after:content-[""] dark:border-white dark:bg-black dark:shadow-white/50 dark:after:border-white dark:after:bg-black ${className}`}>
			{!isSuccess ? (
				<>
					<div className='flex flex-col'>
						<div className='relative flex'>
							<p>Email</p>
							<p className='peer/email cursor-pointer p-1 text-red-500'>*</p>
							<p className='absolute -left-2 top-2 origin-top-right -translate-x-full scale-0 rounded-l-lg border border-black p-2 transition peer-hover/email:scale-100 dark:border-white'>
								O e-mail precisa ser um e-mail válido.
							</p>
						</div>
						<input
							type='email'
							placeholder='eu@contato.com'
							className='rounded-lg border border-black bg-transparent p-1 shadow-sm shadow-black/50 outline-none invalid:text-red-500 dark:border-white dark:shadow-white/50'
							required
							{...register('email')}
						/>
					</div>

					<div className='flex flex-col'>
						<div className='relative flex'>
							<p>Senha</p>
							<p className='peer/password cursor-pointer p-1 text-red-500'>*</p>
							<p className='absolute -left-2 top-2 origin-top-right -translate-x-full scale-0 rounded-l-lg border border-black p-2 transition peer-hover/password:scale-100 dark:border-white'>
								As senhas precisam ser iguais
							</p>
						</div>
						<input
							type='password'
							placeholder='@1234-5678'
							className='rounded-lg border border-black bg-transparent p-1 shadow-sm shadow-black/50 outline-none invalid:text-red-500 dark:border-white dark:shadow-white/50'
							minLength={6}
							required
							pattern='(?=.*\d)(?=.*[a-z]).{6,}'
							{...register('password')}
						/>
						<div className='relative flex'>
							<p>Confirmar Senha</p>
							<p className='peer/password cursor-pointer p-1 text-red-500'>*</p>
							<p className='absolute -left-2 top-2 origin-top-right -translate-x-full scale-0 rounded-l-lg border border-black p-2 transition peer-hover/password:scale-100 dark:border-white'>
								senha precisa conter pelo menos 6 dígitos, com um número e uma letra.
							</p>
						</div>
						<input
							type='password'
							placeholder='@1234-5678'
							className='rounded-lg border border-black bg-transparent p-1 shadow-sm shadow-black/50 outline-none invalid:text-red-500 dark:border-white dark:shadow-white/50'
							minLength={6}
							required
							pattern='(?=.*\d)(?=.*[a-z]).{6,}'
							{...register('confirmPassword')}
						/>
					</div>
					<button className='rounded-lg border border-black p-2 shadow-sm shadow-black/50 transition hover:bg-black/10 dark:border-white dark:shadow-white/50 dark:hover:bg-white/20'>
						entrar
					</button>
					<div
						className={cn(
							'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-red-500 opacity-0 transition',
							{ 'opacity-100': hasError }
						)}>
						{error}
					</div>
				</>
			) : (
				<div className='max'>
					<p>
						Você está quase lá, agora só falta verificar o seu e-mail em:{' '}
						<span className='text-blue-500'>{isSuccess}</span>
					</p>
				</div>
			)}
		</form>
	);
}
