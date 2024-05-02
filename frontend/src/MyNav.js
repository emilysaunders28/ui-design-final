import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Navigate } from 'react-router-dom'

const MyNav = (props) => {
  const user = props.user
  const handleLogout = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:5000/logout').then(() => {
      window.location.href = '/login'
    })
  }
  return (  
    <Navbar bg="light" data-bs-theme="dark" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="/">Colorpedia</Navbar.Brand>
        <Nav className="ml-auto">
          {user && 
            <NavDropdown title={`Logged in as ${user}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="/" onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}
 
export default MyNav;