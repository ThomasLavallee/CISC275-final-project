import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function BasicQuiz(): React.JSX.Element {
    return <div>
        <Link to={"/"}>
           <Button>Home</Button>
        </Link>
        Basic Quiz
    </div>
}