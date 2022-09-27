import axios from 'axios'
import { createContext, FormEvent, ReactNode, useContext, useReducer } from 'react'
import { initialState } from "./reducer/state";
import reducer from "./reducer/reducer";
import { table } from "./models";

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = createContext(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchQuestions = async (url: string) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		dispatch({ type: 'SET_WAITING', payload: false });
		const response = await axios.get(url);
		if (response) {
			const data = response.data.results;
			if (data.length) {
				dispatch({ type: 'SET_QUESTIONS', payload: data });
				dispatch({ type: 'SET_WAITING', payload: false });
				dispatch({ type: 'SET_LOADING', payload: false });
				dispatch({ type: 'SET_ERROR', payload: false });

			} else {
				dispatch({ type: 'SET_WAITING', payload: true });
				dispatch({ type: 'SET_ERROR', payload: true });
			}
		} else {
			dispatch({ type: 'SET_WAITING', payload: true });
		}
	}

	const nextQuestion = () => {
		const index = state.index + 1
		if (index > state.questions.length - 1) {
			openModal();
			dispatch({ type: 'SET_INDEX', payload: 0 });
		} else {
			dispatch({ type: 'SET_INDEX', payload: index })
		}

	}
	const checkAnswer = (value: boolean) => {
		if (value) {
			dispatch({ type: 'SET_CORRECT', payload: state.correct + 1 })
		}
		nextQuestion();
	}

	const openModal = () => {
		dispatch({ type: 'SET_MODAL', payload: true })
	}

	const closeModal = () => {
		dispatch({ type: 'SET_MODAL', payload: false })
		dispatch({ type: 'SET_CORRECT', payload: 0 })
		dispatch({ type: 'SET_WAITING', payload: true })
	}

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
			const target = e.target as HTMLInputElement;
			const name = target.name
			const value = target.value
			dispatch({ type: 'SET_QUIZ', payload: { ...state.quiz, [name]: value} })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { amount, category, difficulty } = state.quiz;
		console.log(amount, category, difficulty)
			const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`
			console.log(url)
			fetchQuestions(url)
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				nextQuestion,
				checkAnswer,
				openModal,
				closeModal,
				handleChange,
				handleSubmit
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
