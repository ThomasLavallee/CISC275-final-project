import React from "react";
import { Button } from "react-bootstrap";
import './HomepageComponentStyles.css'
import { Link } from "react-router-dom";

interface QuizDescriptionProps {
    quizType: "BasicQuiz" | "DetailedQuiz",
    description: string[]
  }

export function QuizDescription({quizType, description}: QuizDescriptionProps): React.JSX.Element {
    // Format the quiz title
    const regex = new RegExp(`(\\Q)`, 'g'); 
    const formattedTitle: string = quizType.replace(regex, ` $1`);;

    return <div className="Quiz-Description">
        <h4>{formattedTitle}:</h4>
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
                <Button id="Begin-Buttons">Begin <br></br>{formattedTitle}</Button>
            </Link>
        </div>
    </div>
}