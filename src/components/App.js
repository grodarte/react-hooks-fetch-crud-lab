import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then(questionData=>setQuestions(questionData))
  }, [])

  function handleAddQuestion(newQuestion){
    setQuestions([
      ...questions,
      newQuestion
    ])
  }

  function handleDeleteQuestion(deletedQuestionID){
    console.log("deleted this question")
    const updatedQuestions = questions.filter(question=>question.id !== deletedQuestionID)

    setQuestions(updatedQuestions)
  }

  function handleUpdateAnswer(updatedQuestion){
    const updatedQuestions = questions.map(question=>{
      if(question.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateAnswer={handleUpdateAnswer}/>}
    </main>
  );
}

export default App;
