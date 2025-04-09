import React from "react";
import '../pages/BasicQuizComponentStyles.css';
import { Form } from "react-bootstrap";

interface BasicQuestionProps {
    question: string,
    options: string[],
    questionNumber: number
    selected: string;
    onSelect: (questionNumber: number, selectedAnswer: string) => void;
  }
//Basic Question template that contains the question, answer choices, and question number
export function BasicQuestion({question, options, questionNumber, selected, onSelect}: BasicQuestionProps): React.JSX.Element {

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        onSelect(questionNumber, event.target.value);
    }

    return <div className="Basic-Question">

        <div>
            <Form.Group controlId="question">
                <h4 id="Question-Label">Question {questionNumber}:</h4>
                    <Form.Label>{question}</Form.Label>
                    <Form.Select id="Question-Dropdown" value={selected} onChange={updateChoice}>
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