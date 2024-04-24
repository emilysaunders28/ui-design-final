import Sidebar from "./Sidebar";
import PageNav from "./PageNav";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Media from './Media';
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";

const Learn = (props) => {
    const userInfo = props.userInfo
    const { page } = useParams();
    const term = props.term
    const { data: content, isPending, error } = useFetch('http://127.0.0.1:5000/data/learn/' + term);

    return (  
        <>
            <Sidebar term={term} type={'learn'} userInfo={userInfo}/>
            <div id='content'>
                { !content && isPending ? <h1>Loading Page...</h1> : <h1>{error}</h1> }
                { !error && content && Object.keys(content).length + 1 > page &&
                            <Container>
                            <Row>
                                <h1 className='term-header'>{content[page].title} <span className='type-header'>Learn</span></h1>
                            </Row>
                            <Row>
                                <div className="learn-text">{content[page].text}</div>
                            </Row>
                            <Row>
                                <Media media={content[page].media}/>
                            </Row>
                        </Container>
                }
                { content && <PageNav currentPage={parseInt(page)} term={term} numberOfPages={Object.keys(content).length} type={'learn'}/>}
            </div>
        </>
    );
}
 
export default Learn;