export interface IAction {
	type: string;
	payload?: any;
}

export interface IState {
	waiting: boolean;
	loading: boolean;
	questions: IQuestion[];
	index: number;
	correct: number;
	error: boolean;
	quiz: {
		amount: number;
		category: number;
		difficulty: string;
	};
	isModalOpen: boolean;
}

export interface IQuestion {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

export enum table {
	sports = 21,
	history = 23,
	politics = 24,
}
