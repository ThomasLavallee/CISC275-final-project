import React from "react";
import { Button } from "react-bootstrap";
import './ComponentStyles.css'
import { Link } from "react-router-dom";

interface QuizDescriptionProps {
    quizType: "BasicQuiz" | "DetailedQuiz",
    description: string[]
  }

export function QuizDescription({quizType, description}: QuizDescriptionProps): React.JSX.Element {
    return <div className="Quiz-Description">
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
            <Button>Begin <br></br>{quizType}</Button>
        </Link>
    </div>
}