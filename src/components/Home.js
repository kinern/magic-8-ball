import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button, Modal} from 'react-bootstrap';


import '../styles/Home.css';

import magicEightBallImg from '../images/sigmund-L8mclmMuWjg-unsplash.jpg';

const Home = () => {

    const [query, setQuery] = useState(""); //Stores input query.
    const [result, setResult] = useState(""); //Stores answer from query.
    const [history, setHistory] = useState([]); //Stores last 10 query results.
    const [show, setShow] = useState(false); //Used with result history modal
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }

    const submitQuery = () => {
        
        const url = 'https://8ball.delegator.com/magic/JSON/';

        if (query === "" || !isValidQuestion()){
            alert("Please enter a question.");
            return;
        }

        setLoading(true);
        
        axios.get(url + query).then(res => {
            setLoading(false);
            const resultString = res.data.magic.answer;
            updateHistory(resultString);
            setResult(resultString);
        }).catch(function (error) {
            setLoading(false);
            alert("Unable to get a response from the magic 8-ball.");
        });
    }

    const isValidQuestion = () => {
        return (query.slice(-1) === "?");
    }

    const updateHistory = (resultString) => {

        const historyTemp = history;

        historyTemp.unshift(resultString); 
        if (historyTemp.length > 10){
            historyTemp.pop(); 
        }

        setHistory(historyTemp);
    }

    return (
        <div className="container">
            {/* &#8209; used instead of "-" to prevent linebreak between "8-Ball"*/}
            <h1>Magic 8&#8209;Ball</h1> 

            <img className="magic-8-ball-img" alt="Magic 8-Ball" src={magicEightBallImg}/>
            
            {/*Query Result*/}
            { loading? <p>Loading...</p> : null /* This text here should be replaced with a spinner image */ } 
            <p className="result">{result}</p>

            <Form className="query-form" >
                <Form.Control className="query-input my-auto" value={query} onChange={handleQueryChange} />

                <div className="d-grid gap-2 action-buttons">
                    <Button type="button" className="query-btn" variant="primary" onClick={submitQuery}>Submit</Button>
                    <Button 
                        button 
                        type="button" 
                        className="history-btn" 
                        variant="secondary"
                        onClick={handleShow}
                        >
                        Show History
                    </Button>
                </div>
            </Form>

            {/*History Popup*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="history-header" closeButton>
                    <Modal.Title>Result History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {history.map((item, index)=>(
                            <li key={item + index}><p>{item}</p></li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Home;