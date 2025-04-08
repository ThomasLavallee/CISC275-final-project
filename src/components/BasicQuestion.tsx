import React, { useState } from "react";
import '../pages/BasicQuizComponentStyles.css';
import { Form } from "react-bootstrap";

interface BasicQuestionProps {
    question: string,
    options: string[],
    questionNumber: number
  }
//Basic Question template that contains the question, answer choices, and question number
export function BasicQuestion({question, options, questionNumber}: BasicQuestionProps): React.JSX.Element {

    const [choice, setChoice] = useState<string>(options[0]);

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setChoice(event.target.value);
    }

    return <div className="Basic-Question">

        <div>
            <Form.Group controlId="question">
                <h4 id="Question-Label">Question {questionNumber}:</h4>
                    <Form.Label>{question}</Form.Label>
                    <Form.Select id="Question-Dropdown" value={choice} onChange={updateChoice}>
                        {options.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </div>
    </div>
}