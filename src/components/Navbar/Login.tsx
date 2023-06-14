'use client';

import { useState, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import LoginForm from './login/LoginForm';
import { cn, supabase } from '@/utils/utils';
import { playerContext, sessionContext } from '@/utils/context';
import { Session } from '@supabase/supabase-js';
import SignupForm from './signup/SingupForm';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Login({
	setSession,
	isOpen,
}: {
	setSession: Dispatch<SetStateAction<Session | null>>;
	isOpen: boolean;
}) {
	const [isLoginOpen, setLoginIsOpen] = useState(false);
	const [isSignupOpen, setSignupIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const session = useContext(sessionContext);
	const player = useContext(playerContext);

	async function handleLogOut() {
		let { error } = await supabase.auth.signOut();

		if (error) {
			alert(error.message);
		} else setSession(null);
	}

	useEffect(() => {
		if (session) {
			setLoginIsOpen(false);
			setSignupIsOpen(false);
		}
		setIsLoading(false);
	}, [session]);

	return (
		<div className={'flex items-center justify-end gap-4'}>
			{isLoading ? (
				<AiOutlineLoading className='animate-spin' />
			) : session ? (
				<>
					<Link
						href={`/jogadores/${player?.user_id}`}
						aria-disabled={player?.user_id ? 'false' : 'true'}
						className='flex items-center rounded-full border border-black p-2 dark:border-white'>
						{player?.name}
					</Link>
					<button
						onClick={handleLogOut}
						className={cn(
							'transition max-sm:absolute max-sm:-bottom-10 max-sm:right-4 max-sm:translate-x-[150%]',
							{
								'z-40 max-sm:translate-x-0': isOpen,
							}
						)}>
						Sair
					</button>
				</>
			) : (
				<>
					<div
						className={cn(
							'relative z-50 transition max-sm:absolute max-sm:-bottom-20 max-sm:right-4 max-sm:translate-x-[150%]',
							{
								'z-40 max-sm:translate-x-0': isOpen,
							}
						)}>
						<button
							onClick={() => {
								setLoginIsOpen((data) => !data);
								setSignupIsOpen((data) => false);
							}}>
							Entrar
						</button>
						<div className='absolute -bottom-4 right-0 z-50 origin-top translate-y-full sm:left-1/2 sm:-translate-x-1/2'>
							<LoginForm
								className={cn('origin-top scale-100 transition', {
									'pointer-events-none h-0 scale-0': !isLoginOpen,
								})}
								setSession={setSession}
							/>
						</div>
					</div>
					<div
						className={cn(
							'relative transition max-sm:absolute max-sm:-bottom-10 max-sm:right-4 max-sm:translate-x-[150%]',
							{
								'z-40 max-sm:translate-x-0': isOpen,
							}
						)}>
						<button
							onClick={() => {
								setSignupIsOpen((data) => !data);
								setLoginIsOpen((data) => false);
							}}
							className='rounded-full border border-black px-2 py-1 dark:border-white sm:py-2'>
							Cadastrar-se
						</button>
						<div className='absolute -bottom-4 z-20 origin-top -translate-x-1/2 translate-y-full'>
							<SignupForm
								className={cn('origin-top scale-100 transition', {
									'pointer-events-none h-0 scale-0 max-sm:w-0': !isSignupOpen,
								})}
								setSession={setSession}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
