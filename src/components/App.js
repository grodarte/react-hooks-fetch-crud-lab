import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:4000/questions`)
    .then(r=>r.json())
    .then(questionData=>setQuestions(questionData))
  }, [])

  function handleChangeAnswer(changedQuestion){
    const updatedQuestions = questions.map(question=>{
      if(question.id === changedQuestion.id){
        return changedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter(question=>question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleAddNewQuestion(newQuestion){
    setQuestions([
      ...questions,
      newQuestion
    ])
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuestion={handleAddNewQuestion}/> : <QuestionList questionData={questions} onDeleteQuestion={handleDeleteQuestion} onChangeAnswer={handleChangeAnswer}/>}
    </main>
  );
}

export default App;
