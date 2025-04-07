import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DetailedQuestion } from '../components/DetailedQuestion';
import { Button } from 'react-bootstrap';


export function DetailedQuiz(): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState<number>(1)

    // All ten of the Detailed questions given in this quiz
    const DetailedQuestions = ["Favorite Color?", "Favorite Food?"]
    // All ten sets of answer choices for the questions in this quiz
    const DetailedOptions = [["red", "green", "blue"], ["apple", "beans", "cat"]]
    
    // Number of questions
    const numQuestions: number = DetailedQuestions.length;

    return <div className="Detailed-Quiz-Page">
        

        <div className="Detailed-Page-Navigation-Buttons">
            <Link to={"/"}>
            <Button>Home</Button>
            </Link>

            <Button disabled={true}>Detailed Quiz</Button>

        </div>
        
        <br></br>
        <div className="Detailed-Quiz-Question-Wrapper">
            <br></br>
            <DetailedQuestion questionNumber={questionNumber} question={DetailedQuestions[questionNumber-1]} options={DetailedOptions[questionNumber-1]}></DetailedQuestion>
            <br></br>
            <Button id="Detailed-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
            <br></br>
            <Button id="Detailed-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===numQuestions}>Next</Button>
        </div>
        <br></br>
        <Button className="Detailed-Quiz-Navigation-Button" disabled={questionNumber!==numQuestions}>Get Results</Button>

    </div>
}