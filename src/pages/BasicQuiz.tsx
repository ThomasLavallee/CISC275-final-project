import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BasicQuestion } from '../components/BasicQuestion';
import { Button } from 'react-bootstrap';
import './BasicQuizComponentStyles.css';


export function BasicQuiz(): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState<number>(1)

    // All ten of the basic questions given in this quiz
    const basicQuestions = ["Favorite Color?", "Favorite Food?"]
    // All ten sets of answer choices for the questions in this quiz
    const basicOptions = [["red", "green", "blue"], ["apple", "beans", "cat"]]
    
    // Number of questions
    const numQuestions: number = basicQuestions.length;

    return <div>
        <div className="Basic-Quiz-Page">
            <div className="Basic-Quiz-Column">
                <Link to={"/"}>
                <Button className="Page-Navigation-Buttons">Home</Button>
                </Link>

                <Button  className="Page-Navigation-Buttons" disabled={true}>Basic Quiz</Button>
                <br></br>
                <BasicQuestion questionNumber={questionNumber} question={basicQuestions[questionNumber-1]} options={basicOptions[questionNumber-1]}></BasicQuestion>
                <br></br>
            </div>

            <div className="Basic-Quiz-Column">
                <Button className="Basic-Quiz-Navigation-Button" onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
                <Button className="Basic-Quiz-Navigation-Button" onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===numQuestions}>Next</Button>
                <br></br>
                <Button className="Basic-Quiz-Navigation-Button" disabled={questionNumber !== numQuestions}>Get Results</Button>
            </div>
        </div>
    </div>
}