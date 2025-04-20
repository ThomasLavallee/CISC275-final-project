import React, { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import './HomepageComponentStyles.css'
import { Link } from "react-router-dom";

interface QuizDescriptionProps {
    quizType: "BasicQuiz" | "DetailedQuiz",
    description: string[],
    setQuizType: Dispatch<SetStateAction<string>>
  }

export function QuizDescription({quizType, description, setQuizType}: QuizDescriptionProps): React.JSX.Element {
    // Format the quiz title
    const regex = new RegExp(`(\\Q)`, 'g'); 
    const formattedTitle: string = quizType.replace(regex, ` $1`);;

    return <div className="Quiz-Description">
        <h4 className="Homepage-Description-Headers">{formattedTitle}:</h4>
        <div className="Description-Container">
            <ul className="Quiz-Description-Text">
            {
                description.map((sentence: string, index: number) => {
                    return <li key={index}>{sentence}</li>
                })
            }
            </ul>
        </div>

        <div className="Begin-Quiz-Buttons">
            <Link to={`/${quizType}`}>
                <Button id="Begin-Buttons" onClick={() => {
                    if (quizType === "BasicQuiz") {
                        setQuizType("Basic");
                    } else {
                        setQuizType("Detailed");
                    }
                }}>Begin <br></br>{formattedTitle}</Button>
            </Link>
        </div>
    </div>
}