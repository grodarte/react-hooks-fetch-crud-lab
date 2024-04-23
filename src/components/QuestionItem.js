import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClickDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(()=>onDeleteQuestion(id))
  }

  function handleChangeAnswer(newCorrectIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      })
    })
    .then(r=>r.json())
    .then(updatedQuestion=>onUpdateAnswer(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e)=>handleChangeAnswer(e.target.value)}>{options}</select>
      </label>
      <button onClick={handleClickDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
