import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questionData, onDeleteQuestion, onChangeAnswer }) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionData.map(question=><QuestionItem key={question.id} question={question} onDeleteQuestion={onDeleteQuestion} onChangeAnswer={onChangeAnswer}/>)}</ul>
    </section>
  );
}

export default QuestionList;
