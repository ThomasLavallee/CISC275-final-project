import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function BasicQuiz(): React.JSX.Element {

    const [questionNumber, setQuestionNumber] = useState<number>(1)

    return <div>
        <Link to={"/"}>
           <Button>Home</Button>
        </Link>
        Basic Quiz
        <br></br>
        <Button onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
        <Button onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===10}>Next</Button>
        <div>{questionNumber}</div>
    </div>
}