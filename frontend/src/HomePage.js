import Container from "react-bootstrap/esm/Container";
import MyNav from "./MyNav";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col"

const HomePage = (props) => {
    const userInfo = props.userInfo
    const progress = userInfo['progress']
    const titles = ['Hue', 'Shade', 'Tint', 'Tone', 'Chroma', 'Value', 'Contrast']
    const urls = ['hue', 'shade', 'tint', 'tone', 'chroma_saturation', 'value', 'contrast']

    const handleLogout = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:5000/logout').then(() => {
          window.location.href = '/login'
        })
    }

    return (
        <>
            <Container id="homepage">
                <Row className="homepage-user-info">
                    <Col className="logged-in-as">Logged in as {userInfo['user']}</Col>
                    <Col className="homepage-logout-col"><button className="btn homepage-logout" onClick={handleLogout}>Logout</button></Col>
                </Row>
                <Row >
                    <h6>Welcome to</h6>
                    <h1>Colorpedia</h1>
                    <div>
                        A website to learn color theory terminology. Click the button or select a term below to get started.
                    </div>

                </Row>
                <Row>
                    <a href="/hue/learn/1">
                        <button className="btn btn-lg homepage-button">Start Learning</button>
                    </a>
                </Row>
                <Row>
                    {titles.map((term, index) => {
                        return (
                            <Col xs={4} md={3} xl={2} key={index}>
                                <div className="homepage-nav">
                                    <Row className="homepage-nav-title">
                                        <h2><i className={progress[urls[index]] ? "bi bi-check-circle-fill" : "bi bi-check-circle"}></i></h2><h2>{term}</h2>
                                    </Row>
                                    <Row className="homepage-nav-links">
                                        <a href={`/${urls[index]}/learn/1`}>Learn</a>
                                        <a href={`/${urls[index]}/quiz/1`}>Quiz</a>
                                    </Row>
                                </div>
                            </Col>
                        )
                    })}
                    <Col xs={4} md={3} xl={2}>
                        <div className="homepage-nav final">
                            <Row className="homepage-nav-title">
                                <a href="/final/1">
                                <h2><i className={progress['final'] ? "bi bi-check-circle-fill" : "bi bi-check-circle"}></i></h2><h2>Final Quiz</h2>
                                </a>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <div id="homepage-caption">Painting by Mark Rothko</div>
            </Container>
        </>
        
     );
}
 
export default HomePage;