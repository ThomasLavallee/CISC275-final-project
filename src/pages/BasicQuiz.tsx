import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BasicQuestion} from '../components/BasicQuestion';
import { Button } from 'react-bootstrap';
import './BasicQuizComponentStyles.css';

interface BasicQuizProps {
    validAPI: boolean,
    setAppAnswers: (newAnswer: string) => void
}


export function BasicQuiz({validAPI, setAppAnswers}: BasicQuizProps): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState<number>(1)
    // All ten of the basic questions given in this quiz
    const basicQuestions = ["Do you like working with people?", "Would you rather design or build something?", "Do you like working creatively?","Do you like leading others?","Do you prefer routine or variety at work?","Do you like working in hands-on environments?","Are you comfortable using technology?","Do you enjoy writing?","Would you rather work alone or in a team?","Do you enjoy public speaking?"]
    // All ten sets of answer choices for the questions in this quiz
    const basicOptions = [["","Yes, all the time","Sometimes","Not really","Only in small groups"], ["","Design","Build","Both","Neither"],["","All the time","Occasionally","Not much","Only when necessary"],["","Yes","Sometimes","Not really","Only if no one else will"],["","Routine","Variety","A balance","I'm not sure"],["","Yes","Sometimes","Not really","Only for hobbies"],["","Very comfortable","Somewhat comfortable","Not really","I avoid it"],["","Yes","A little","Not much","I dislike it"],["","Alone","In a team","Either","Depends on the task"],["","Yes","Sometimes","Not really","I avoid it"]]
    // Number of questions
    const numQuestions: number = basicQuestions.length;
    // State :)
    const [answers, setAnswers] = useState<string[]>(Array(numQuestions).fill(""));
    // Full string of questions and answers
    let basicReport: string = ""
    for (let i = 0; i < numQuestions; i++) {
        basicReport += basicQuestions[i] + " " + answers[i] + ".\n"
    }
    // Update answers in the app file
    setAppAnswers(basicReport);
    if (basicReport) {}

    return <div className="Basic-Quiz-Page">
        

        <div className="Basic-Progress-Bar-Wrapper">
            <div className="Basic-Progress-Bar-Border">
                <div style={{ width: `${(questionNumber/basicQuestions.length) * 100}%`, transition: "width 0.5s" }} className="Basic-Progress-Bar">{(questionNumber/basicQuestions.length) * 100}%</div>
            </div>
        </div>

        <div className="Basic-Quiz-Question-Wrapper">
            
            <BasicQuestion questionNumber={questionNumber} question={basicQuestions[questionNumber-1]} options={basicOptions[questionNumber-1]} selected={answers[questionNumber-1]} 
            onSelect={(qn, selectedAnswer) => {
                const updatedAnswers = [...answers];
                updatedAnswers[qn - 1] = selectedAnswer;
                setAnswers(updatedAnswers)
            }}></BasicQuestion>
            <div id="Basic-Quiz-Prev-Next-Wrapper">
                
                <Button id="Basic-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
                
                <Button id="Basic-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===numQuestions || answers[questionNumber-1]===""}>Next</Button>
            </div>
        </div>
        <br></br>
        
        <div id="Basic-Quiz-Complete">
        <p id="Basic-Quiz-Complete-Message" style={{visibility: questionNumber === 10 && answers[questionNumber - 1] !== "" 
            ? "visible" 
            : "hidden"}}>Quiz Complete!</p>
        </div>
        <div style = {{visibility: questionNumber === 10 && answers[questionNumber - 1] !== "" 
            ? "visible"
            : "hidden"
        }}>

            {(questionNumber===numQuestions && answers[questionNumber-1]!=="" && !validAPI) ?
                <div className='Invalid-Key-Banner'>
                    Quiz Complete 
                    <br></br>
                    Please Enter Valid API Key to View Results
                </div>
                :
                <span></span>
            }

            <Button className="Basic-Quiz-Navigation-Button" disabled={(questionNumber!==numQuestions  || answers[questionNumber-1]==="") || !validAPI}>
                <Link to={"/Results"} style={{color: "white", textDecoration: "none"}}>
                Get Results
                </Link>
            </Button>
        </div>
        

    </div>
}