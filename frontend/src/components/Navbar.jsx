import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {  Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import '../scss/main.scss'
import Datalist from './Datalist';
import NavLists from './NavLists'

function MyNavbar() {
    return (
        <Navbar bg="white" expand="lg" className='navbar'>
        <Container>
            <Navbar.Brand href="/">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav">
                <NavLists />
                <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Trouver un signe"
                className="navInput"
                id='navInput'
                aria-label="Search"
                list = "suggestions"
                />
                <Datalist />
            </Form>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
export default MyNavbar