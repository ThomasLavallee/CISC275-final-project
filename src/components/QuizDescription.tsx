import React from "react";
import { Button } from "react-bootstrap";
import './ComponentStyles.css'

interface QuizDescriptionProps {
    quizType: "Basic" | "Detailed",
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
        <Button>Begin <br></br>{quizType} Quiz</Button>
    </div>
}