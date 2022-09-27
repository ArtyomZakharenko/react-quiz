import {
	SET_CORRECT,
	SET_ERROR,
	SET_INDEX,
	SET_LOADING,
	SET_MODAL,
	SET_QUESTIONS,
	SET_QUIZ,
	SET_WAITING
} from './actions'
import { IAction, IState } from "../models";

function reducer(state: IState, action: IAction): IState {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.payload
			}
		case SET_WAITING:
			return {
				...state,
				waiting: action.payload
			}
		case SET_QUESTIONS:
			return {
				...state,
				questions: action.payload,
			}
		case SET_INDEX:
			return {
				...state,
				index: action.payload,
			}
		case SET_CORRECT:
			return {
				...state,
				correct: action.payload,
			}
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			}
		case SET_QUIZ:
			return {
				...state,
				quiz: action.payload,
			}
		case SET_MODAL:
			return {
				...state,
				isModalOpen: action.payload,
			}
		default:
			throw new Error(`no matching "${action.type}" action type`)
	}
}

export default reducer;
