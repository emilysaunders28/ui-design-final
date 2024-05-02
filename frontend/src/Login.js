import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useState } from 'react';

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
            <div className="login-welcome">
                <h1>Colorpedia</h1>
                <p>Log in or create an account to get started.</p>
                <div className='login-caption'>{'No.61 (Rust and Blue) by Mark Rothko'}</div>
            </div>
            <Container className='login-form-container'>
                <Row>
                    <h4>Existing Users</h4>
                    <Form onSubmit={handleUserSubmit} className='login-form'>
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
                        <Button type='submit' variant='dark'>Submit</Button>
                    </Form>
                </Row>
                <Row>
                    <h4>New Users</h4>
                    <Form onSubmit={handleNewUserSubmit} className='login-form'>
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
                        <Button type='submit' variant='dark'>Create Account</Button>
                    </Form>
                </Row>
            </Container>
        </div>

    );
}
 
export default Login;