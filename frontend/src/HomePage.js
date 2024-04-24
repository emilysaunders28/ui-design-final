import Container from "react-bootstrap/esm/Container";

const HomePage = (props) => {
    const userInfo = props.userInfo
    return ( 
        <Container>
            <h1>Colorpedia Home Page</h1>
            <div>
                Welcome to Colorpedia, a website to learn color terminology. Click the button below to get started!
            </div>
            <a href="/hue/learn/1">
                <button className="btn btn-dark">Start Learning</button>
            </a>
        </Container>
     );
}
 
export default HomePage;