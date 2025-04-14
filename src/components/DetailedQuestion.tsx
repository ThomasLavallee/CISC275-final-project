import React from "react";
import '../pages/DetailedQuizComponentStyles.css';
import { Form } from "react-bootstrap";

interface DetailedQuestionProps {
    question: string,
    options: string[],
    questionNumber: number
    selected: string;
    onSelect: (questionNumber: number, selectedAnswer: string) => void;
  }
//Detailed Question template that contains the question, answer choices, and question number
export function DetailedQuestion({question, options, questionNumber, selected, onSelect}: DetailedQuestionProps): React.JSX.Element {

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        onSelect(questionNumber, event.target.value);
    }

    return <div className="Detailed-Question">

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