import Accordion from 'react-bootstrap/Accordion';

const Sidebar = () => {
    const terms = ['Hue', 'Shade', 'Tint', 'Tone', 'Chroma/Saturation', 'Value', 'Contrast']
    return ( 
        <div className="sidebar">
            <Accordion flush>
                {terms.map((term, index) => {
                    return (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{term}</Accordion.Header>
                            <Accordion.Body>
                                <a href="/">
                                    <div>
                                        Learn
                                    </div>
                                </a>
                                <a href="/">
                                    <div>
                                        Quiz
                                    </div>
                                </a>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
                <a href="/">
                    <div className="final-quiz-sidebar">Final Quiz</div>
                </a>
            </Accordion>
        </div>
    );
}
 
export default Sidebar;