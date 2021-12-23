import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {  Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../scss/main.scss'

function MyNavbar() {
    return (
        <Navbar bg="white" expand="lg" className='navbar'>
        <Container>
            <Navbar.Brand href="/">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav">
                <Nav.Link href="/">Ma liste "A travailler"</Nav.Link>
                <Nav.Link href="/">Ma liste "Connus"</Nav.Link>
                <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Trouver un signe"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
export default MyNavbar