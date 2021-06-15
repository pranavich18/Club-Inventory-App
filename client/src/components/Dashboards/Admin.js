import React, {useState, useEffect} from 'react'
import {logout} from '../../helpers/user'
import { Redirect } from 'react-router'
import {getAdminDashboard, changeconvenerRole, changememberRole, addNewClub, addNewUser} from '../../helpers/admin'
import {Row, Col, Card,ListGroup ,ListGroupItem, CardDeck, Modal, Form, Button, Navbar, Nav, NavDropdown} from 'react-bootstrap'


export default function Admin(){

    const [loggedIn, setLoggedIn] = useState(true);
    const [admin, setAdmin] = useState({});
    const [clubs, setClubs] = useState([]);
    const [users, setUsers] = useState([]);
    const [showMember, setShowMember] = useState(false);
    const [showRequest, setShowRequest] = useState(false);
    const [showItem, setShowItem] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showAddClub, setShowAddClub] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showChangeRole, setShowChangeRole] = useState(false);
    const [convenerRole, setConvenerRole] = useState('convener');
    const [memberRole, setMemberRole] = useState('member');
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [userClub, setUserClub] = useState('');
    const [memberId, setMemberId] =useState('');
    const [userId, setUserId] = useState('');
    const [reload, setReload] = useState('');
    const [members, setMembers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [items, setItems] = useState([]);


    const handleCloseMember = () => setShowMember(false);
    const handleShowMember = () => setShowMember(true);
    const handleCloseRequest = () => setShowRequest(false);
    const handleShowRequest = () => setShowRequest(true);
    const handleCloseItem = () => setShowItem(false);
    const handleShowItem = () => setShowItem(true);
    const handleCloseUser = () => setShowUser(false);
    const handleShowUser = () => setShowUser(true);
    const handleCloseAddClub = () => setShowAddClub(false);
    const handleShowAddClub = () => setShowAddClub(true);
    const handleCloseAddUser = () => setShowAddUser(false);
    const handleShowAddUser = () => setShowAddUser(true);
    const handleCloseChangeRole = () => setShowChangeRole(false);
    const handleShowChangeRole = () => setShowChangeRole(true);

    useEffect(()=>{
        getAdminDashboard().then((response)=> {
            console.log(response);
            if(response.code){
                console.log("Success");
                setAdmin(response.data.admin);
                setClubs(response.data.clubs);
                setUsers(response.data.users);
            }
            else{
                setLoggedIn(false);
                console.log("Failed, login again!!");
            }
        });
    },[]);

    if(reload){
        getAdminDashboard().then((response)=> {
            console.log(response);
            if(response.code){
                console.log("Success");
                setAdmin(response.data.admin);
                setClubs(response.data.clubs);
                setUsers(response.data.users);
            }
            else{
                console.log("Failed");
            }
        });
        setReload(0);
    }

    function handleShowChangeRoleWithId(e, memberID){
        setMemberId(memberID);
        handleShowChangeRole();
        setReload(1);
    }

    function handleShowAddUserWithId(e,userID){
        setUserId(userID);
        handleShowAddUser();
        setReload(1);
    }

    function passMembers(e,memberList){
        setMembers(memberList);
        handleShowMember();
    }

    function passItems(e,itemList){
        setItems(itemList);
        handleShowItem();
    }

    function passRequests(e,requestList){
        setRequests(requestList);
        handleShowRequest();
    }

    function changeConvenerRole(e,convenerID){
        e.preventDefault();
        console.log(convenerRole);
        console.log(convenerID);
        handleCloseChangeRole();
        changeconvenerRole(convenerRole, convenerID).then((response)=>{
            if(response.code){
                console.log("Convener's Role Changed to " + convenerRole );
            }
            else{
                console.log("Failed to change convener role");
            }
        });
        setConvenerRole('');
        setReload(1);
    }

    function changeMemberRole(e){
        e.preventDefault();
        console.log(memberRole);
        handleCloseChangeRole();
        changememberRole(memberRole,memberId).then((response)=>{
            if(response.code){
                console.log("Member's role changed to " + memberRole );
            }
            else{
                console.log(response.message);
            }
        });
        setMemberRole('');
        setMemberId('');
        setReload(1);
    }

    function addClub(e){
        e.preventDefault();
        const data = {
            clbName: clubName,
            clbDescription: clubDescription
        };
        handleCloseAddClub();
        addNewClub(data).then((response)=>{
            if(response.code){
                console.log("Club " + clubName + " Added Successfully");
            }
            else{
                console.log("Failed to add new club");
                console.log(response.message);
            }
        });
        setClubName('');
        setClubDescription('');
        setReload(1);
    }

    function addUser(e){
        e.preventDefault();
        handleCloseAddUser();
        addNewUser(userId, userClub).then((response)=>{
            if(response.code){
                console.log("User added successfully");
            }
            else{
                console.log(response.message);
            }
        });
        setUserClub('');
        setUserId('');
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
        setReload(1);
    }




    
    if(loggedIn){
        return (

            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand >Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        { admin &&
                            <NavDropdown.Item >{'Welcome ' + admin.name +' !!'} </NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        { admin &&
                            <NavDropdown.Item >{'Email- ' + admin.email}</NavDropdown.Item>
                        }
                        <NavDropdown.Divider />
                        <NavDropdown.Item variant="dark" action onClick = {(e) => logOutUser(e)}>LogOut</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div className="member-dashboard">
                    <Row>
                        {clubs.map((club,index) =>(
                            <Col md={6} lg={4}>
                            <CardDeck>
                            <Card>
                            <Card.Img variant="top" src={club.info.image} />
                            <Card.Body>
                                <Card.Title>{club.info.name}</Card.Title>
                                <Card.Text>
                                Description: {club.info.description}
                                </Card.Text>
                                Convener Info:
                                {club.convener.length &&
                                <Card.Text>
                                    {club.convener[0].name}<br/>
                                    {club.convener[0].email}<br/>
                                    <Button size="sm" variant="primary" action onClick = {handleShowChangeRole}>
                                            Change Role
                                    </Button>
                                    <Modal size="md" show={showChangeRole} onHide={handleCloseChangeRole}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Fill the necessary information below.</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form onSubmit={(e)=> changeConvenerRole(e, club.convener[0]._id)}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Role</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Role" value= {convenerRole} onChange = {(e)=> setConvenerRole(e.target.value) } />
                                                    <Form.Text className="text-muted">
                                                    Enter the role in lower case, like 'user','member' or 'admin' 
                                                    </Form.Text>
                                                </Form.Group>
                                                <br/>
                                                <Button variant="primary" type="submit">
                                                    Change Role
                                                </Button>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>
                                </Card.Text>
                                
                                }
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem action onClick = {(e)=>passMembers(e,club.members)}>Member List</ListGroupItem>
                                <ListGroupItem action onClick = {(e)=>passRequests(e, club.requests)}>Request List</ListGroupItem>
                                <ListGroupItem action onClick = {(e)=>passItems(e, club.info.items)}>Item List</ListGroupItem>
                            </ListGroup>
                            <Modal size = "lg" show={showMember} onHide={handleCloseMember}>
                                <Modal.Header closeButton>
                                <Modal.Title>Club Members</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <ListGroup className="list-group-flush">
                                    {members.map((member)=>(
                                        <ListGroupItem>
                                            Name- {member.name} <br/>Email- {member.email}
                                            <br/><br/>
                                            <Button size="sm" variant="primary" action onClick = {(e) => handleShowChangeRoleWithId(e, member._id)}>
                                            Change Role
                                            </Button>
                                            <Modal size="md" show={showChangeRole} onHide={handleCloseChangeRole}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Fill the necessary information below.</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form onSubmit={(e)=> changeMemberRole(e)}>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Role</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Role" value= {memberRole} onChange = {(e)=> setMemberRole(e.target.value)} />
                                                            <Form.Text className="text-muted">
                                                            Enter the role in lower case, like 'user','convener' or 'admin' 
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <br/>
                                                        <Button variant="primary" type="submit">
                                                            Change Role
                                                        </Button>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                </Modal.Footer>
                                            </Modal>
                                        </ListGroupItem>   
                                    ))}
                                </ListGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            <Modal size = "lg" show={showRequest} onHide={handleCloseRequest}>
                                <Modal.Header closeButton>
                                <Modal.Title>Requests Within Club</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <ListGroup className="list-group-flush">
                                    {requests.map((request)=>(
                                        <ListGroupItem>RequesterID- {request.requestID} <br/>ItemID- {request.itemID}<br/>Requested Quantity- {request.quantity}<br/>Status- {request.status}</ListGroupItem>
                                    ))}
                                </ListGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            <Modal size = "lg" show={showItem} onHide={handleCloseItem}>
                                <Modal.Header closeButton>
                                <Modal.Title>Items Within Club</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <ListGroup className="list-group-flush">
                                    {items.map((item)=>(
                                            <ListGroupItem>
                                            ItemID- {item._id} <br/>Item Name- {item.itemName}<br/>Item Description- {item.itemDescription}<br/>Item Quantity- {item.quantity}
                                            </ListGroupItem>
                                    ))}
                                </ListGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            </Card>
                            </CardDeck>
                            <br/>
                            </Col>
                        ))}
                        
                        <Col md={6} lg={4}>
                            <CardDeck>
                            <Card>
                            <Card.Body>
                                <Card.Title>Users</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem action onClick = {handleShowUser}>Click to see the Users</ListGroupItem>
                            </ListGroup>
                            <Modal size = "lg" show={showUser} onHide={handleCloseUser}>
                                <Modal.Header closeButton>
                                <Modal.Title>Users</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <ListGroup className="list-group-flush">
                                    {users.map((user,index)=>(
                                            <ListGroupItem>
                                            Name- {user.name} <br/>Email- {user.email}
                                            <br/><br/>
                                            <Button variant="primary" action onClick = {(e) =>handleShowAddUserWithId(e,user._id)}>
                                            Add to Club
                                            </Button>
                                            <Modal show={showAddUser} onHide={handleCloseAddUser}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Fill the necessary information below.</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form onSubmit={(e)=> addUser(e)}>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Label>Club Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Club Name" value= {userClub} onChange = {(e)=> setUserClub(e.target.value)} />
                                                            <Form.Text className="text-muted">
                                                            Use names of existing clubs. 
                                                            </Form.Text>
                                                            <br/>
                                                        </Form.Group>
                                                        <br/>
                                                        <Button variant="primary" type="submit">
                                                            Add User
                                                        </Button>
                                                    </Form>
                                                </Modal.Body>
                                            </Modal>
                                            </ListGroupItem>
                                    ))}
                                </ListGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
                            </Card>
                            </CardDeck>
                            <br/>
                        </Col>
                        
                        <Col md={6} lg={4}>
                            <CardDeck>
                            <Card>
                            <Card.Body>
                                <Card.Title>Add Clubs</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem action onClick = {handleShowAddClub}>Click to Add Clubs</ListGroupItem>
                            </ListGroup>
                            <Modal size="lg" show={showAddClub} onHide={handleCloseAddClub}>
                                <Modal.Header closeButton>
                                <Modal.Title>Fill the necessary information below.</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit = {(e)=> addClub(e)} >
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Club Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Club Name" value= {clubName} onChange = {(e)=> setClubName(e.target.value) }/>
                                            <Form.Text className="text-muted">
                                            Don't use names of existing clubs. 
                                            </Form.Text>
                                            <br/>
                                            <Form.Label>Club Description</Form.Label>
                                            <Form.Control as="textarea" placeholder="Enter Club Description" value= {clubDescription} onChange = {(e)=> setClubDescription(e.target.value) }/>
                                            <Form.Text className="text-muted">
                                            Describe your club. 
                                            </Form.Text>
                                            <br/>
                                            <Form.File id="exampleFormControlFile1" label="Add image of your club" />
                                        </Form.Group>
                                        <br/>
                                        <Button variant="primary" type="submit">
                                            Create Club
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>
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