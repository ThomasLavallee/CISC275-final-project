import React, { Dispatch, SetStateAction } from 'react';
import { QuizDescription } from '../components/QuizDescription';

interface HomepageProps {
  setQuizType: Dispatch<SetStateAction<string>>
}

export function Homepage({setQuizType}: HomepageProps): React.JSX.Element {
  const quizInstructions: string[] = ["Select and navigate to the quiz you would like to take", "Answer each question in the quiz by selecting an option from the dropdown then selecting 'next'", "After answering all the questions, enter the API key and submit", "Then click 'View Results' to see your Career Quiz Results!"];  
  const basicCareerDescription: string[] = ["Identify your career interests quickly", "Answer 10 simple questions quickly", "Receive detailed report of 5 careers you fit with explanations of the career", "Receive information on each career's average salary and characteristics that make you a good fit for the career"]
  const detailedCareerDescription: string[] = ["Understand your career desires in detail", "Answer 16 questions in minutes", "Receive in-depth report of 5 careers with detailed explanations that fit you" , "Learn about each career's average salary and characteristics that make you a good fit"];

    return <div className='Homepage-Container'>
            <div className='Instruction-Container'>
              <h4 className="Homepage-Description-Headers">Instructions:</h4>
              <ol className='Homepage-Instructions'>
                {
                  quizInstructions.map((currentInstruction: string) => {
                    return <li key={currentInstruction}>{currentInstruction}</li>
                  })
                }
              </ol>
            </div>
            
            <QuizDescription quizType='BasicQuiz' description={basicCareerDescription} setQuizType={setQuizType}></QuizDescription>
            <QuizDescription quizType='DetailedQuiz' description={detailedCareerDescription} setQuizType={setQuizType}></QuizDescription>
  </div>
}