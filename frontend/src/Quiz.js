import Sidebar from "./Sidebar";
import QuizPageNav from "./QuizPageNav";
import QuizFormImage from "./QuizFormImage";
import QuizFormText from "./QuizFormText";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useFetch from "./useFetch";
import Figure from 'react-bootstrap/Figure'
import { useParams } from "react-router-dom";
import { useState } from 'react';

const Quiz = (props) => {
    const userInfo = props.userInfo
    const term = props.term
    const { page } = useParams();
    const [selected,setSelected] = useState(userInfo['quiz'][term][parseInt(page)-1]);
    const [submitted, setSubmitted] = useState(Boolean(selected))

    const titles = {"hue": "Hue", "shade": "Shade", "tint": "Tint", "tone": "Tone", "chroma_saturation": "Chroma/Saturation", "value": "Value", "contrast": "Contrast", "final": "Final Quiz", "none": ""}
    const nextTerm = {"hue": "shade", "shade": "tint", "tint": "tone", "tone": "chroma_saturation", "chroma_saturation": "value", "value": "contrast", "contrast": "final", "final" : "none"}

    const { data: questions, isPending, error } = useFetch('http://127.0.0.1:5000/data/quiz/' + term);


    return (
        <>
            <Sidebar term={term} type={'quiz'} userInfo={userInfo}/>
            <div id='content'>
                { !questions && isPending ? <h1>Loading Page...</h1> : <h1>{error}</h1> }
                { !error && questions && Object.keys(questions).length + 1 > page &&
                        <Container className="learn-quiz-container">
                            <Row className="header-row">
                                <h1 className='term-header'>{titles[term]}</h1>
                                {term !== 'final' && <h1 className='type-header'>Quiz</h1>}
                            </Row>
                            <Row className="question-text">
                                <div className="question-number">{`Quesiton ${page}`}</div>
                                <div className="quiz-text">{questions[page]['question_text']}</div>
                            </Row>
                            <Row className="question-media-row">
                                {questions[page]['question_media'] && questions[page]['question_media'].map((media, index) => {
                                    return (
                                        <Figure key={index} className="question-media">
                                            <Figure.Image src={media['src']}/>
                                            <Figure.Caption>
                                                <p dangerouslySetInnerHTML={{ __html: media['caption'] }} />
                                            </Figure.Caption>
                                        </Figure>
                                    )
                                })}
                            </Row>
                            <Row>
                                {questions[page]['type']==='image_select' && 
                                <QuizFormImage 
                                    options={questions[page]['options']} 
                                    question={{"term" : term, "id": page}} 
                                    selected={selected}
                                    setSelected={setSelected}
                                    submitted={submitted}
                                    setSubmitted={setSubmitted}
                                />}
                                {questions[page]['type']==='multiple_choice' && 
                                <QuizFormText 
                                    options={questions[page]['options']} 
                                    question={{"term" : term, "id": page}} 
                                    selected={selected}
                                    setSelected={setSelected}
                                    submitted={submitted}
                                    setSubmitted={setSubmitted}
                                />}
                            </Row>
                            { questions && 
                                <QuizPageNav 
                                    currentPage={parseInt(page)} 
                                    term={term} 
                                    numberOfPages={Object.keys(questions).length} 
                                    type={'quiz'} 
                                    options={questions[page]['options']}
                                    selected={selected}
                                    submitted={submitted}
                                    nextTerm={nextTerm[term]}
                                    nextTermTitle={titles[nextTerm[term]]}
                                />
                            }
                        </Container>
                }
                {/* { questions && <PageNav currentPage={parseInt(page)} term={term} numberOfPages={Object.keys(questions).length} type='quiz'/>} */}
            </div>
        </>
    );
}

export default Quiz;