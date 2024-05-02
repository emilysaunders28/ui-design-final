import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const QuizFormImage = (props) => {
    const options = props.options
    const question = props.question

    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.setSubmitted(true)
        const selected = props.selected
        const data = { selected, question }
        console.log(data)
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
        <Form className='image-form'>
            <Form.Group className="mb-3">
                {options.map(option => {
                    return <Form.Check 
                        type='radio' 
                        key={option.id}
                        disabled={props.submitted}
                        label={
                            <Figure className='quiz-option'>
                                <Figure.Image src={option.src}/>
                                <Figure.Caption>
                                    <p dangerouslySetInnerHTML={{ __html: option['caption'] }} />
                                </Figure.Caption>
                            </Figure>
                        }
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
 
export default QuizFormImage;