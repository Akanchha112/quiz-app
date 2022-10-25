import React from "react";
import { AnswerObject } from '../App';
import "./Card.css";
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCArd: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => {
    // let correct:boolean;
    return (
        <div>
            <p className='number'>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} className="question" />
            <div>
                {answers.map((answer) => (
                    <div
                        key={answer}
                        className="options"
                        
                        // userClicked={userAnswer?.answer === answer}
                    >
                        <button disabled={userAnswer ? true : false} value={answer} onClick={callback} className="option-button" 
                            style={{
                                backgroundColor:(userAnswer?.correctAnswer === answer )?'green':"#E7F6F2",
                                // backgroundColor:(userAnswer?.answer === answer )?'red':"#E7F6F2",
                            }}
                        >
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default QuestionCArd;