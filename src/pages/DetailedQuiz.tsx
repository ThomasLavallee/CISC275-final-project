import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function DetailedQuiz(): React.JSX.Element {
    return <div>
        Detailed Quiz

        <Link to={"/"}>
            <Button>Home</Button>
        </Link>
    </div>
}