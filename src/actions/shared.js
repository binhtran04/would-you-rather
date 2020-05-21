import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api';
import { receiveQuestions, updateQuestion, addQuestion } from './questions';
import { receiveUsers, updateUser } from './users';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_USER = 'sarahedo';

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_USER));
      dispatch(hideLoading());
    });
  };
};

export const handleSaveQuestionAnswer = ({ qid, answer }) => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser, users, questions } = getState();
    const user = { ...users[authedUser] };
    const question = { ...questions[qid] };

    user.answers[qid] = answer;
    question[answer].votes.push(authedUser);

    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(updateQuestion(question));
      dispatch(updateUser(user));
      dispatch(hideLoading());
    });
  };
};

export function handleSaveQuestion(question) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { users } = getState();
    const user = { ...users[question.author] };
    user.questions.push(question.id);

    return saveQuestion(question).then((response) => {
      dispatch(addQuestion(response));
      dispatch(updateUser(user));
      dispatch(hideLoading());
    });
  };
}
