import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BasicQuestion } from '../components/BasicQuestion';
import { Button } from 'react-bootstrap';
import './BasicQuizComponentStyles.css';


export function BasicQuiz(): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState<number>(1)

    // All ten of the basic questions given in this quiz
    const basicQuestions = ["Do you like working with people?", "Would you rather design or build something?", "Do you like working creatively?","Do you like leading others?","Do you prefer routine or variety at work?","Do you like working in hands-on environments?","Are you comfortable using technology?","Do you enjoy writing?","Would you rather work alone or in a team?","Do you enjoy public speaking?"]
    // All ten sets of answer choices for the questions in this quiz
    const basicOptions = [["Yes, all the time","Sometimes","Not really","Only in small groups"], ["Design","Build","Both","Neither"],["All the time","Occasionally","Not much","Only when necessary"],["Yes","Sometimes","Not really","Only if no one else will"],["Routine","Variety","A balance","I'm not sure"],["Yes","Sometimes","Not really","Only for hobbies"],["Very comfortable","Somewhat comfortable","Not really","I avoid it"],["Yes","A little","Not much","I dislike it"],["Alone","In a team","Either","Depends on the task"],["Yes","Sometimes","Not really","I avoid it"]]
    
    // Number of questions
    const numQuestions: number = basicQuestions.length;

    return <div className="Basic-Quiz-Page">
        

        <div className="Basic-Page-Navigation-Buttons">
            <Link to={"/"}>
            <Button>Home</Button>
            </Link>

            <Link to={"/DetailedQuiz"}>
                <Button disabled={true}>Detailed Quiz</Button>
            </Link>
        </div>
        
        <br></br>
        <div className="Basic-Quiz-Question-Wrapper">
            <br></br>
            <BasicQuestion questionNumber={questionNumber} question={basicQuestions[questionNumber-1]} options={basicOptions[questionNumber-1]}></BasicQuestion>
            <br></br>
            <Button id="Basic-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
            <br></br>
            <Button id="Basic-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===numQuestions}>Next</Button>
        </div>
        <br></br>
        <Link to={"/Results"}>
            <Button className="Basic-Quiz-Navigation-Button" disabled={questionNumber!==numQuestions}>Get Results</Button>
        </Link>
    </div>
}