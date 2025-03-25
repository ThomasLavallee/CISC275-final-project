import React from "react";
import { Button } from "react-bootstrap";
import './ComponentStyles.css'
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
            <ul>
            {
                description.map((sentence: string) => {
                    return <li>{sentence}</li>
                })
            }
            </ul>
        </div>
        <Link to={`/${quizType}`}>
            <Button>Begin <br></br>{formattedTitle}</Button>
        </Link>
    </div>
}