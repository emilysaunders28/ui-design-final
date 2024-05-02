import Container from "react-bootstrap/esm/Container";

const HomePage = (props) => {
    const userInfo = props.userInfo
    return ( 
        <>
            <div>
                <h6>Welcome to</h6>
                <h1>Colorpedia</h1>
                <div>
                    A website to learn color theory terminology.
                </div>
                <a href="/hue/learn/1">
                    <button className="btn btn-dark">Start Learning</button>
                </a>
            </div>
            <div id="homepage-image">

            </div>
        </>

     );
}
 
export default HomePage;