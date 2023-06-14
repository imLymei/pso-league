'use client';

import { useState, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import LoginForm from './login/LoginForm';
import { cn, supabase } from '@/utils/utils';
import { playerContext, sessionContext } from '@/utils/context';
import { Session } from '@supabase/supabase-js';
import SignupForm from './signup/SingupForm';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Login({ setSession }: { setSession: Dispatch<SetStateAction<Session | null>> }) {
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
		<div className={'flex justify-end gap-4'}>
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
					<button onClick={handleLogOut}>Sair</button>
				</>
			) : (
				<>
					<div className='relative'>
						<button
							onClick={() => {
								setLoginIsOpen((data) => !data);
								setSignupIsOpen((data) => false);
							}}>
							Entrar
						</button>
						<div className='absolute -bottom-4 left-1/2 z-20 origin-top -translate-x-1/2 translate-y-full'>
							<LoginForm
								className={cn('origin-top scale-100 transition', {
									'h-0 scale-0': !isLoginOpen,
								})}
								setSession={setSession}
							/>
						</div>
					</div>
					<div className='relative'>
						<button
							onClick={() => {
								setSignupIsOpen((data) => !data);
								setLoginIsOpen((data) => false);
							}}>
							Cadastrar-se
						</button>
						<div className='absolute -bottom-4 z-20 origin-top -translate-x-1/2 translate-y-full'>
							<SignupForm
								className={cn('origin-top scale-100 transition', {
									'h-0 scale-0': !isSignupOpen,
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
