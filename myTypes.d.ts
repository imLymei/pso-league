interface match {
	id: number;
	home: number;
	away: number;
	results: string;
}

interface player {
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

interface team {
	id: number;
	name: string;
	players: string[];
	captain: string;
	owner: string;
	description?: string;
	image?: string;
	data?: MatchData;
}
