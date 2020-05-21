export function formatQuestion(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  return {
    id,
    timestamp,
    optionOne,
    optionTwo,
    authorName: name,
    authorAvatar: avatarURL,
  };
}
