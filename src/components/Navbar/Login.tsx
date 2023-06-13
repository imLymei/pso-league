'use client';

import { useState, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import LoginForm from './login/LoginForm';
import { cn, supabase } from '@/utils/utils';
import { sessionContext } from '@/utils/context';
import { Session } from '@supabase/supabase-js';

export default function Login({ setSession }: { setSession: Dispatch<SetStateAction<Session | null>> }) {
	const [isOpen, setIsOpen] = useState(false);

	const session = useContext(sessionContext);

	async function handleLogOut() {
		let { error } = await supabase.auth.signOut();

		if (error) {
			alert(error.message);
		} else setSession(null);
	}

	useEffect(() => {
		if (session) {
			setIsOpen(false);
		}
	}, [session]);

	return (
		<div className='flex gap-2'>
			<p>{session?.user.email}</p>
			{session ? (
				<button onClick={handleLogOut}>Sair</button>
			) : (
				<>
					<div className='relative'>
						<button onClick={() => setIsOpen((data) => !data)}>Entrar</button>
						<div className='absolute -bottom-2 left-1/2 z-20 origin-top -translate-x-1/2 translate-y-full'>
							<LoginForm
								className={cn('origin-top scale-100 transition', {
									'scale-0': !isOpen,
								})}
								setSession={setSession}
							/>
						</div>
					</div>
					<button>Registrar-se</button>
				</>
			)}
		</div>
	);
}
