import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MediaElement from './MediaElement';

const LearnPage = (props) => {
    const pageContent = props.content

    return (  
        <Container>
            <Row>
                <h1 className='term-header'>{pageContent.title}</h1>
            </Row>
            <Row>
                <div className="learn-text">{pageContent.text}</div>
            </Row>
            <Row>
                {
                    pageContent.media.map((media_element) => {
                        return <MediaElement media={media_element} key={media_element.id}/>
                    })
                }
            </Row>
        </Container>
    );
}
 
export default LearnPage;