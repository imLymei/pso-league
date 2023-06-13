interface match {
	id: number;
	homeTeam: team;
	awayTeam: team;
	result: {
		homeGoals: number;
		awayGoals: number;
		winner: 'home' | 'away';
	};
}

interface player {
	id: number;
	name: string;
	number: number;
}

interface team {
	id: number;
	name: string;
	players: player[];
	captain: player;
}
