import {useState, useEffect} from 'react'
import {getConvenerDashboard, acceptMemberRequest, denyMemberRequest, addNewItem} from '../../helpers/convener'
import {logout} from '../../helpers/user'
import { Redirect } from 'react-router'
import {Row, Col, Card,ListGroup ,ListGroupItem, CardDeck, Modal, Button, Form, Navbar, Nav, NavDropdown} from 'react-bootstrap'

export default function Convener(){

    const [loggedIn, setLoggedIn] = useState(true);
    const [members, setMembers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [items, setItems] = useState([]);
    const [convener, setConvener] = useState([]);
    const [showAddItem, setShowAddItem] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemNumber, setItemNumber] = useState(0);
    const [reload, setReload] = useState(0);
    const [image, setImage] = useState(null);

    const handleCloseAddItem = () => setShowAddItem(false);
    const handleShowAddItem = () => setShowAddItem(true);
    

    useEffect(()=>{
        getConvenerDashboard().then((response)=>{
            console.log(response);
            if(response.code){
                console.log("Success");
                setConvener(response.data.info);
                setMembers(response.data.memberList);
                setRequests(response.data.requestList);
                setItems(response.data.itemList);
            } 
            else{
                setLoggedIn(false);
                console.log("Failed, login again!!");
            }
        });
    },[]);

    if(reload){
        getConvenerDashboard().then((response)=>{
            console.log(response);
            if(response.code){
                console.log("Success");
                setConvener(response.data.info);
                setMembers(response.data.memberList);
                setRequests(response.data.requestList);
                setItems(response.data.itemList);
            } 
            else{
                console.log("Failed");
            }
        });
        setReload(0);
    }

    function addItem(e){
        e.preventDefault();
        handleCloseAddItem();
        const data = {
            clbName: convener[0].clubName,
            itemName: itemName,
            itemDescription: itemDescription,
            itemNumber: itemNumber
        };
        const formData = new FormData();
        formData.append('file', image);
        console.log(image);
        addNewItem(data,formData).then((response)=>{
            if(response.code){
                console.log("New Item added successfully");
            }
            else{
                console.log("Failed to add a new item");
            }
        });
        setItemName('');
        setItemDescription('');
        setItemNumber(0);
        setReload(1);
    }

    function acceptRequest(e, requestID, itemID, quantity) {
        acceptMemberRequest(requestID, itemID, quantity).then((response)=>{
            if(response.code){
                console.log("Request Accepted");
                setReload(1);
            }
            else{
                console.log(response.message);
                console.log("Failed to accept the request");
                setReload(1);
            }
        });
        setReload(1);
    }

    function denyRequest(e,requestID){
        denyMemberRequest(requestID).then((response)=>{
            if(response.code){
                console.log("Request Denied successfully");
                setReload(1);
            }
            else{
                console.log("Failed to deny the request");
                setReload(1);
            }
        });
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
                <Navbar.Brand >Convener Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        { convener.length &&
                            <NavDropdown.Item>{'Welcome ' + convener[0].name +' !!'} </NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        { convener.length &&
                            <NavDropdown.Item>{'Email- ' + convener[0].email}</NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item variant="dark" action onClick = {(e) => logOutUser(e)}>LogOut</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                <div className="member-dashboard">

                <Row>
                    {convener.map((conv)=>(
                        <Col  lg={12} >
                        <CardDeck>
                        <Card className="text-center">
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>{conv.clubName}</Card.Title>
                            <Card.Text>
                            Role: Convener 
                            </Card.Text>
                            <Card.Text>
                            Convener Info: <br/> 
                            Name- {conv.name}
                            <br/>
                            Email- {conv.email}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        </CardDeck>
                        <br/>
                        </Col>
                    ))}     
                    
                    <Col  sm={12} md={6} lg={4} >
                        <CardDeck>
                        <Card>
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>Members of Club</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {members.map((member)=>(
                                <ListGroupItem>
                                Name- {member.name}
                                <br/>
                                Email- {member.email}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        </Card>
                        </CardDeck>
                    </Col>
                    
                    <Col  sm={12} md={6} lg={4} >
                        <CardDeck>
                        <Card>
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>Items of CLub</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {items.map((item)=>(
                                <ListGroupItem>
                                ID- {item._id}
                                <br/>
                                Name- {item.itemName}
                                <br/>
                                Description- {item.itemDescription}
                                <br/>
                                Quantity- {item.quantity}
                                </ListGroupItem>
                            ))}
                            <ListGroupItem variant="primary" action onClick = {handleShowAddItem}>
                                Add Item
                            </ListGroupItem>
                            <Modal size="lg" show={showAddItem} onHide={handleCloseAddItem}>
                                <Modal.Header closeButton>
                                <Modal.Title>Fill the necessary information below.</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={(e)=> addItem(e)}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Item Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Item Name" value={itemName} onChange={(e)=>setItemName(e.target.value)}/>
                                            <br/>
                                            <Form.Label>Item Description</Form.Label>
                                            <Form.Control as="textarea" placeholder="Enter Item Description" value={itemDescription} onChange={(e)=> setItemDescription(e.target.value)}/>
                                            <Form.Text className="text-muted">
                                            Describe your item. 
                                            </Form.Text>
                                            <br/>
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control min={0} type="number" placeholder="Enter Number of Items " value={itemNumber} onChange={(e)=> setItemNumber(e.target.value)}/>
                                            <Form.Text className="text-muted">
                                            Enter a valid value.
                                            </Form.Text>
                                            <Form.File id="exampleFormControlFile1" label="Add image of your item" onChange={(e)=> setImage(e.target.files[0])}/>
                                        </Form.Group>
                                        <br/>
                                        <Button variant="primary" type="submit">
                                            Add Item
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                        </ListGroup>
                        </Card>
                        </CardDeck>
                    </Col>

                    <Col  sm={12} md={6} lg={4} >
                        <CardDeck>
                        <Card>
                        <Card.Img variant="top" src='' />
                        <Card.Body>
                            <Card.Title>Requests of Members</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {requests.map((request)=>(
                                <ListGroupItem>
                                RequesterID- {request.requestID}
                                <br/>
                                ItemID- {request.itemID}
                                <br/>
                                Quantity- {request.quantity}
                                <br/>
                                <span>
                                <Button size="sm" variant="primary" onClick = {(e)=> acceptRequest(e,request.requestID, request.itemID, request.quantity)}>
                                        Accept
                                </Button> <Button size="sm" variant="primary" onClick = {(e)=> denyRequest(e,request.requestID)}>
                                        Deny
                                </Button>
                                </span>
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
        return <Redirect to="/" />
    }
}