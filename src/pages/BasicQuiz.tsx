import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BasicQuestion } from '../components/BasicQuestion';

export function BasicQuiz(): React.JSX.Element {

    const [questionNumber, setQuestionNumber] = useState<number>(1)

    // All ten of the basic questions given in this quiz
    const basicQuestions = ["Favorite Color?", "Favorite Food?"]
    // All ten sets of answer choices for the questions in this quiz
    const basicOptions = [["red", "green", "blue"], ["apple", "beans", "cat"]]
    // Number of questions
    const numOfQuestions = 10

    return <div>
        <Link to={"/"}>
           <Button>Home</Button>
        </Link>
        <Button disabled={true}>Basic Quiz</Button>
        <br></br>
        <BasicQuestion questionNumber={questionNumber} question={basicQuestions[questionNumber-1]} options={basicOptions[questionNumber-1]}></BasicQuestion>
        <br></br>
        <Button onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
        <Button onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===numOfQuestions}>Next</Button>
        <br></br>
        <Button disabled={questionNumber!==numOfQuestions}>Get Results</Button>
    </div>
}