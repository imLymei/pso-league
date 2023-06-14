'use client';

import { supabase } from '@/utils/utils';
import { useEffect, useState } from 'react';

export default function Times() {
	const [teams, setTeams] = useState<team[]>([]);

	async function getTeams() {
		let { data: teams, error } = await supabase.from('teams').select('*');

		if (!error) {
			//@ts-ignore
			setTeams([...teams]);
		}
	}

	useEffect(() => {
		getTeams();
	}, []);

	return (
		<div>
			<button onClick={getTeams}>Get Teams</button>
			{teams.map((team) => (
				<div key={team.id}>{team.name}</div>
			))}
		</div>
	);
}
