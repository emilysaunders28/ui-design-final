import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'
import { useState } from 'react';

const MediaElement = (props) => {
    const media = props.media

    const caption = media.caption
    const description = media.description
    const src = media.src

    const [show, setShow] = useState(false)

    const handleClose = () => {setShow(false)}
    const handleExpand = () => {setShow(true)}

    // Add a click to expand for these so that users can see larger images more clearly

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={src} />
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        {caption}
                    </Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button onClick={handleExpand}>Expand</Button>
                </Card.Body>
            </Card>
            <Modal show={show} size='lg' centered>
                <Modal.Body>
                    <Image src={src} fluid/>
                    <Row>{caption}</Row>
                    <Row>{description}</Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default MediaElement;