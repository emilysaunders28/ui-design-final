import Sidebar from "./Sidebar";
import PageNav from "./PageNav";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import { useState } from 'react';

const Quiz = (props) => {
    const userInfo = props.userInfo
    const titles = {"hue": "Hue", "shade": "Shade", "tint": "Tint", "tone": "Tone", "chroma_saturation": "Chroma/Saturation", "value": "Value", "contrast": "Contrast", "final": "Final Quiz"}
    const { page } = useParams();
    const term = props.term
    const { data: content, isPending, error } = useFetch('http://127.0.0.1:5000/data/quiz/' + term);
    console.log(content)

    return (
        <>
            <Sidebar term={term} type={'quiz'} userInfo={userInfo}/>
            <div id='content'>
                { !content && isPending ? <h1>Loading Page...</h1> : <h1>{error}</h1> }
                { !error && content && Object.keys(content).length + 1 > page &&
                            <Container>
                            <Row>
                                <h1 className='term-header'>{titles[term]}{term !== 'final' && <span className='type-header'>Quiz</span>}</h1>
                            </Row>
                            <Row>
                                <div className="quiz-text">{content[page]['question_text']}</div>
                            </Row>
                            <Row>
                                <div>Options go here</div>
                            </Row>
                        </Container>
                }
                { content && <PageNav currentPage={parseInt(page)} term={term} numberOfPages={Object.keys(content).length} type='quiz'/>}
            </div>
        </>
    );
}
 
export default Quiz;