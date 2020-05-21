import { RECEIVE_QUESTIONS, UPDATE_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };
    case UPDATE_QUESTION:
      return { ...state, [action.question.id]: action.question };
    default:
      return state;
  }
}
