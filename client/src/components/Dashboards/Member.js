import {useState, useEffect} from 'react'
import {getMemberDashboard, requestNewItem} from '../../helpers/members'
import {logout} from '../../helpers/user'
import { Redirect } from 'react-router'
import {Row, Col, Card,ListGroup ,ListGroupItem, CardDeck, Modal, Button, Form, Navbar, Nav, NavDropdown} from 'react-bootstrap'

export default function Member(){

    const [loggedIn, setLoggedIn] = useState(true);
    const [members, setMembers] = useState([]);
    const [items, setItems] = useState([]);
    const [requests, setRequests] = useState([]);
    const [showRequestItem, setShowRequestItem] = useState(false);
    const [itemNumber, setItemNumber] = useState(0);
    const [reload, setReload] = useState(0);
    const [itemId, setItemId] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);

    const handleCloseRequestItem = () => setShowRequestItem(false);
    const handleShowRequestItem = () => setShowRequestItem(true);

    useEffect(()=>{
        getMemberDashboard().then((response)=>{
            console.log(response);
            if(response.code){
                console.log("Success");
                setMembers(response.data.member);
                setItems(response.data.itemList);
                setRequests(response.data.requestList);
            }
            else{
                setLoggedIn(false);
                console.log("Failed, login again!!");
            }
        });
    },[]);

    if(reload){
        getMemberDashboard().then((response)=>{
            console.log(response);
            if(response.code){
                console.log("Success");
                setMembers(response.data.member);
                setItems(response.data.itemList);
                setRequests(response.data.requestList);
            }
            else{
                console.log("Failed");
            }
        });
        setReload(0);
    }

    function handleShowRequestWithItemId(e, itemID, quantity){
        setItemId(itemID);
        setItemQuantity(quantity);
        handleShowRequestItem();
    }

    function requestItem(e){
        e.preventDefault();
        const data = {
            requesterid: members[0]._id,
            itemid: itemId,
            quantity: itemNumber
        };
        handleCloseRequestItem();
        requestNewItem(data).then((response)=>{
            if(response.code){
                console.log("Request has been made with success");
            }
            else{
                console.log("Failed to make request");
            }
        });
        setItemNumber(0);
        setItemId('');
        setItemQuantity(0);
        setReload(1);
    }

    function logOutUser(e){
        logout().then((response)=>{
            console.log(response);
            setLoggedIn(false);
            if(response.code){
                console.log("User Logged Out successfully!!");
            }
            else{
                console.log("Token Expired!!");
            }
        });
    }

    

    if(loggedIn){

        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand >Member Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-betwwen">
                    <Nav>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        { members.length &&
                            <NavDropdown.Item>{'Welcome ' + members[0].name +' !!'} </NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        { members.length &&
                            <NavDropdown.Item>{'Email- ' + members[0].email}</NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item variant="dark" action onClick = {(e) => logOutUser(e)}>LogOut</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                <div className="member-dashboard">
                    <Row>
                        {members.map((member)=>(
                            <Col lg={12} >
                                <CardDeck>
                                <Card className="text-center">
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>{member.clubName}</Card.Title>
                                    <Card.Text>
                                    Role: {member.role}
                                    <br/>
                                    Name: {member.name}
                                    <br/>
                                    Email: {member.email}
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                                </CardDeck>
                                <br/>
                            </Col>
                        ))}

                        <Col md={12} lg={6} >
                            <CardDeck>
                                <Card className="text-center">
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>Items Available</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {items.map((item)=>(
                                        <ListGroupItem>
                                            ItemID: {item._id}
                                            <br/>
                                            Name: {item.itemName}
                                            <br/>
                                            Description: {item.itemDescription}
                                            <br/>
                                            Quantity: {item.quantity}
                                            <br/>
                                            <Button size="sm" variant="primary" action onClick = {(e)=>handleShowRequestWithItemId(e,item._id, item.quantity)}>
                                                Request Item
                                            </Button>
                                            <Modal size="md" show={showRequestItem} onHide={handleCloseRequestItem}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Fill the necessary information below.</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form onSubmit={(e)=>requestItem(e)}>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Quantity</Form.Label>
                                                            <Form.Control min={0} max={itemQuantity} type="number" placeholder="Enter quantity" value={itemNumber} onChange={(e)=> setItemNumber(e.target.value)}/>
                                                            <Form.Text className="text-muted">
                                                            Enter a valid value
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <br/>
                                                        <Button variant="primary" type="submit">
                                                            Request
                                                        </Button>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                </Modal.Footer>
                                            </Modal>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                                </Card>
                            </CardDeck>
                        </Col>

                        <Col md={12} lg={6} >
                            <CardDeck>
                                <Card className="text-center">
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title>Items Requested</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {requests.map((request)=>(
                                        <ListGroupItem>
                                            RequesterID: {request.requestID}
                                            <br/>
                                            ItemID: {request.itemID}
                                            <br/>
                                            Requested Quantity: {request.quantity}
                                            <br/>
                                            Status: {request.status}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                                </Card>
                            </CardDeck>
                        </Col>

                    </Row>

                    <br/>

                </div>
            </div>
        );
    }
    else{
        return <Redirect to="/" />;
    }
}