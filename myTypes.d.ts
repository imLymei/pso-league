interface Match {
	id: number;
	home: number;
	home_scores?: string[];
	away: number;
	away_scores?: string[];
	results: string;
	created_at: Date;
}

interface Player {
	id: number;
	name: string;
	number: number;
	email: number;
	user_id: string;
}

interface MatchData {
	pts: number;
	pj: number;
	v: number;
	e: number;
	d: number;
	goals: number;
}

interface Team {
	id: number;
	name: string;
	players: string[];
	captain: string;
	owner: string;
	description?: string;
	image?: string;
	data?: MatchData;
}
