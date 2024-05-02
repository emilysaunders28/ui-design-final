import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const QuizFormText = (props) => {
    const options = props.options
    const question = props.question
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.setSubmitted(true)
        const selected = props.selected
        const data = { selected, question }
        console.log(data)
        fetch('http://127.0.0.1:5000/quiz', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res)
        })
    }

    const handleRetry = () => {
        props.setSubmitted(false)
        props.setSelected('')
    }

    const handleChange = (e) => {
        props.setSelected(e.target.value)
    }

    return (
        <Form >
            <Form.Group className="mb-3">
                {options.map(option => {
                    return <Form.Check 
                        type='radio' 
                        disabled={props.submitted}
                        key={option.id}
                        label={option.text}
                        value={option.id}
                        checked={props.selected === option.id}
                        onChange={handleChange}
                    />
                })}
            </Form.Group>
            {props.submitted && props.selected===options[props.selected].id && <div className={options[props.selected].correct ? 'correct' : 'incorrect'}>{options[props.selected].explanation}</div>}
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
            {props.submitted && !options[props.selected].correct && <Button onClick={handleRetry} >Retry</Button>}
        </Form>
    );
}
 
export default QuizFormText;