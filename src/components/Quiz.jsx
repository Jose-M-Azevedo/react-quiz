import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // Depending how many answers the user has answered gets the active question
  // Ex: userAnswers[A, B, C] -> the length of the array is 2 and we get question at position 2
  const activeQuestionIndex = userAnswers.length;

  // Sets to true if the current question is the last question from "QUESTIONS" array
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // Updates the User answers with the new selected answer without overwriting the previous questions answered
  // Which also updates activeQuestionIndex
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  },
  []);

  // Add new entry to userAnswers but it will be "null" -> used in QuestionTimer component once the timeout expries
  // Needs useCallback
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // Quiz complete screen
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
