import { IState, table } from "../models";

export const initialState : IState = {
	waiting: true,
	loading: false,
	questions: [],
	index: 0,
	correct: 0,
	error: false,
	quiz: {
		amount: 10,
		category: table.sports,
		difficulty: 'easy',
	},
	isModalOpen: false,
}
