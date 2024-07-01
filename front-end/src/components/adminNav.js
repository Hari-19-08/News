import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/topNav.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Example() {


    const [val, setvalue] = useState({});
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow(false)
        setShow2(true);
    }

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Signup = async (e) => {
        e.preventDefault();
        try {
            console.log(val)
            const create = await axios.post(`http://localhost:5000/signup/`, val);
            if (create.data) {
                navigate(`/user/${create.data}`);
            } else if(create.data === '')  {
                alert("not")
            };
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };
    const Login = async (e) => {
        e.preventDefault();
        try {
            console.log(val)
            const create = await axios.post(`http://localhost:5000/login/`, val);
            if (create.data) {
                navigate(`/user/${create.data}`);
            } else  {
                alert("not")
            };
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#861A03' }}>
                <div className='top'>
                    <div className='tit' onClick={() => { window.location.href = '/' }} style={{cursor:'pointer'}}>NEWS Hub</div>
                    <div style={{width:'400px', display:'flex', justifyContent:'space-between'}}>
                        <div className='log-btn' onClick={()=>{window.location.href='/admin/news'}}> All NEWS</div>
                        <div className='log-btn' onClick={()=>{window.location.href='/admin/users'}}>Users</div>
                        <div onClick={()=>{window.location.href=`/admin`}} className='log-btn'>Home</div>
                    </div>
                </div>
            </div>

            {/* <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <label>Username</label>
                            <input name='id' onChange={input} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input name='password' onChange={input} />
                        </div>
                    </div>
                    <div>Don't have account? <span onClick={handleShow2} style={{ fontSize: '18px', color: 'Blue', cursor: 'pointer' }}>signup</span></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Login}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <label>Name</label>
                            <input name='name' onChange={input}/>
                        </div>
                        <div>
                            <label>Username</label>
                            <input name='id'onChange={input}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input name='password' onChange={input}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Signup}>
                        Signup
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export default Example;