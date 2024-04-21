import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

const MyNav = () => {
    return (  
        <Navbar bg="light" data-bs-theme="dark" sticky='top'>
        <Container>
          <Navbar.Brand href="/">Colorpedia</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Link</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}
 
export default MyNav;