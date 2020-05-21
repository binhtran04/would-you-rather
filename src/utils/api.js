import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA';

export const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
    return {
      users,
      questions,
    };
  });
};

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => {
  return _saveQuestionAnswer({ authedUser, qid, answer });
};
