import Accordion from 'react-bootstrap/Accordion';

const Sidebar = (props) => {
    const userInfo = props.userInfo
    const activeTerm = props.term
    const activeType = props.type
    const terms = ['Hue', 'Shade', 'Tint', 'Tone', 'Chroma/Saturation', 'Value', 'Contrast']
    const termsUrl = ['hue', 'shade', 'tint', 'tone', 'chroma_saturation', 'value', 'contrast']
    return ( 
        <div className="sidebar">
            <Accordion defaultActiveKey={activeTerm} flush>
                {terms.map((term, index) => {
                    return (
                        <Accordion.Item eventKey={termsUrl[index]} key={index}>
                            <Accordion.Header>{term}</Accordion.Header>
                            <Accordion.Body>
                                <a href={`/${termsUrl[index]}/learn/1`}>
                                    <div className='sidebar-link'>
                                        Learn
                                    </div>
                                </a>
                                <a href={`/${termsUrl[index]}/quiz/1`}>
                                    <div className='sidebar-link'>
                                        Quiz
                                    </div>
                                </a>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
                <a href="/final/1">
                    <div className="final-quiz-sidebar">Final Quiz</div>
                </a>
            </Accordion>
        </div>
    );
}

export default Sidebar;