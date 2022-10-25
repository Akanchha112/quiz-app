import React, { useState } from 'react';
import QuestionCard from './components/QuestionCArd';
import { fetchQuizQuestions } from './API';
import { QuestionsState, Difficulty } from './API';
import "./index.css";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [curr,setCurr]=useState(0);

  const btn = document.getElementById('next') as HTMLButtonElement | null;
  if (selected === false) {
    btn?.setAttribute('disabled', '');
  } else if(selected === true ) {
    btn?.removeAttribute('disabled');
  }
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setCurr(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 5);
      }
      else{
        setScore((prev) => prev -1);
      }
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      // console.log("Inside APP");
      
      setSelected(true);
      setCurr(curr+1);

    }
  }
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
    // (userAnswers ? false : true).setAttribute('disabled','');
    if(number<(curr-1)){
      setSelected(true);
    }
    else{
      setSelected(false);
    }
    console.log("curr: ",curr-1);
    
    console.log("next ",number);
  }
  const previousQuestion = () => {
    const nextQ = number - 1;

    if (nextQ < 0) {
      alert("OutOfBound error");
    } else {
      setNumber(nextQ);
    }
    setSelected(true);
    console.log("curr: ",curr);
    console.log("prev ",number);
  }
  return (
    <div className="App">
      <h1>QUIZ</h1>
      <div className='app-container'>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: <span className='score-num'>{score}</span></p> : null}
        {loading ? <p className='loading'>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        <div className="buttonsprevnext">
          {!gameOver && !loading && number !== 0? (
            <button className='previous button' id='prev' onClick={previousQuestion}>
              Previous Question
            </button>
          ) : null}
          {!gameOver && !loading && number !==  TOTAL_QUESTIONS - 1 ? (
            <button className='next button' id='next' onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}

        </div>

      </div>
    </div>
  );
}

export default App;


// && userAnswers.length === number + 1