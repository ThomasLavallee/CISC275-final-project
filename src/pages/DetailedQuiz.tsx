import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DetailedQuestion} from '../components/DetailedQuestion';
import { Button } from 'react-bootstrap';
import './DetailedQuizComponentStyles.css';

interface DetailedQuizProps {
    validAPI: boolean
}


export function DetailedQuiz({validAPI}: DetailedQuizProps): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState<number>(1)
    // All ten of the Detailed questions given in this quiz
    const DetailedQuestions = ["What type of work environment do you prefer?", "What motivates you the most in a job?","How do you prefer to work?","Which school subject did you enjoy the most?","What is your ideal work schedule?","What role do you usually take in group projects?","How do you feel about public speaking?","Which of these tools or resources interests you the most?","What would your ideal boss be like?","Which of these activities sounds most enjoyable?"]
    // All ten sets of answer choices for the questions in this quiz
    const DetailedOptions = [["","A structured office setting with clear guidelines", "A flexible, creative space where I can innovate", "Outdoors or in a hands-on setting","A fast-paced, high-energy environment"], ["","Stability and financial security", "Creativity and self-expression", "Making a tangible impact on people’s lives","Excitement and new challenges"],["","Independently, with clear tasks to complete","Collaboratively, bouncing ideas off others","Hands-on, actively engaging with tasks","In a leadership role, guiding a team"],["","Math and science","Art, music, or literature","Physical education or shop class","Social studies or business"],["","A structured 9-to-5 schedule","A flexible schedule where I set my own hours","A mix of physical activity and desk work","A high-energy job with varying hours"],["","The planner who organizes and sets deadlines","The creative mind who comes up with fresh ideas","The hands-on worker who gets things done","The leader who motivates and manages the team"],["","I prefer to communicate through writing or data","I don’t mind it if I can be creative with my presentation","I’d rather avoid it and focus on hands-on work","I love speaking in front of groups and sharing ideas"],["","Spreadsheets, data analytics, or coding software","Sketchbooks, cameras, or musical instruments","Tools, machinery, or physical equipment","Microphones, business plans, or networking apps"],["","Clear and structured with clear expectations","Encouraging and open to new ideas","Hands-off, letting me work independently","Inspiring and energetic, pushing me to succeed"],["","Solving a complex puzzle or coding a program","Creating an artistic design or writing a story","Building or fixing something with my hands","Leading a project or managing a team"]]
    // Number of questions
    const numQuestions: number = DetailedQuestions.length;
    // State :)
    const [answers, setAnswers] = useState<string[]>(Array(numQuestions).fill(""));
    // Full string of questions and answers
    let DetailedReport: string = ""
    for (let i = 0; i < numQuestions; i++) {
        DetailedReport += DetailedQuestions[i] + " " + answers[i] + ".\n"
    }
    if (DetailedReport) {}

    return <div className="Detailed-Quiz-Page">
        
        <header className="Detailed-Quiz-Navbar">
            <div className="Detailed-Page-Navigation-Buttons">
                <Link to={"/"}>
                <Button>Home</Button>
                </Link>

                <Link to={"/DetailedQuiz"}>
                    <Button>Detailed Quiz</Button>
                </Link>
            </div>
        </header>
        

        <div className="Detailed-Progress-Bar-Wrapper">
            <div className="Detailed-Progress-Bar-Border">
                <div style={{ width: `${(questionNumber/DetailedQuestions.length) * 100}%` }} className="Detailed-Progress-Bar">{(questionNumber/DetailedQuestions.length) * 100}%</div>
            </div>
        </div>

        <div className="Detailed-Quiz-Question-Wrapper">
            
            <DetailedQuestion questionNumber={questionNumber} question={DetailedQuestions[questionNumber-1]} options={DetailedOptions[questionNumber-1]} selected={answers[questionNumber-1]} 
            onSelect={(qn, selectedAnswer) => {
                const updatedAnswers = [...answers];
                updatedAnswers[qn - 1] = selectedAnswer;
                setAnswers(updatedAnswers)
            }}></DetailedQuestion>
            <div id="Detailed-Quiz-Prev-Next-Wrapper">
                
                <Button id="Detailed-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber-1)}} disabled={questionNumber===1}>Previous</Button>
                
                <Button id="Detailed-Quiz-Prev-Next-Button" onClick={() => {setQuestionNumber(questionNumber+1)}} disabled={questionNumber===numQuestions || answers[questionNumber-1]===""}>Next</Button>
            </div>
        </div>
        <br></br>
        
        <Button className="Detailed-Quiz-Navigation-Button" disabled={(questionNumber!==numQuestions) || !validAPI}>
            <Link to={"/Results"} style={{color: "white", textDecoration: "none"}}>
            Get Results
            </Link>
        </Button>
        
    </div>
}