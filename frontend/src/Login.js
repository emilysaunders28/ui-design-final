import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';

const Login = () => {
    const [user, setUser] = useState('');
    const [newUser, setNewUser] = useState('');
    const [userError, setUserError] = useState('');
    const [newUserError, setNewUserError] = useState('');

    const handleUserSubmit = (e) => {
        e.preventDefault();
        const data = { user }
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((res) => {
            window.location.href = '/'
        })
    }

    const handleNewUserSubmit = (e) => {
        e.preventDefault();
        const data = { newUser }
        fetch('http://127.0.0.1:5000/create', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(
            window.location.href = '/'
        )
    }

    return (
        <div className="login-container">
            <Container className='login-form-container'>
                <Row className="login-welcome">
                    <Col>
                        <img src="/styling_images/logo2.png" alt="logo" className='login-logo'></img>
                        <p>Log in or create an account to get started.</p>
                    </Col>
                </Row>
                <Row className='login-form-row'>
                    <Col className='login-form-col'>
                        <Form onSubmit={handleUserSubmit} className='login-form'>
                            <h4>Existing Users</h4>
                            <Form.Group className='mb-3'>
                                <Form.Label>Enter your uername</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='username' 
                                    name='user'
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Enter your password</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='password' 
                                    name='password'
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Form.Group>
                            <Button type='submit' variant='dark'>Submit</Button>
                        </Form>
                    </Col>
                    <Col className='login-form-col'>
                        <Form onSubmit={handleNewUserSubmit} className='login-form'>
                            <h4>New Users</h4>
                            <Form.Group className='mb-3'>
                                <Form.Label>Create a new username</Form.Label>
                                <Form.Control
                                    type='text' 
                                    placeholder='username' 
                                    name='new_user'
                                    value={newUser}
                                    onChange={(e) => setNewUser(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Create a password</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='password' 
                                    name='new_password'
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Form.Group>
                            <Button type='submit' variant='dark'>Create Account</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}
 
export default Login;