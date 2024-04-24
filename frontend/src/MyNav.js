import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

const MyNav = (props) => {
  const user = props.user
  return (  
    <Navbar bg="light" data-bs-theme="dark" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="/">Colorpedia</Navbar.Brand>
        <Nav className="ml-auto">
          {user && 
            <NavDropdown title={`Logged in as ${user}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Log out</NavDropdown.Item>
            </NavDropdown>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}
 
export default MyNav;