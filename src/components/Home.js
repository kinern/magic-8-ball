import React, {useState} from 'react';
import axios from 'axios';
import '../styles/Home.css';

import magicEightBallImg from '../images/sigmund-L8mclmMuWjg-unsplash.jpg';

const Home = () => {

    const [query, setQuery] = useState(""); //Stores input query.
    const [result, setResult] = useState(""); //Stores answer from query.
    const [history, setHistory] = useState([]); //Stores last 10 query results.

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }

    const submitQuery = () => {
        if (query === "") return;
        const url = 'https://8ball.delegator.com/magic/JSON/';
        axios.get(url + query).then(res => {
            const resultString = res.data.magic.answer;
            updateHistory(resultString);
            setResult(resultString);
        });
    }

    const updateHistory = (resultString) => {
        const historyTemp = history;
        historyTemp.unshift(resultString); 
        if (historyTemp.length > 10){
            historyTemp.pop(); 
        }
        setHistory(historyTemp);
    }

    const showHistory = () => {

    }

    return (
        <div className="container">
            {/* &#8209; used instead of "-" to prevent linebreak between "8-Ball"*/}
            <h1>Magic 8&#8209;Ball</h1> 

            <img className="magic-8-ball-img" src={magicEightBallImg}/>
            
            {/*Query Result*/}
            <p>{result}</p>

            <input className="form-control form-control-md" value={query} onChange={handleQueryChange}/>

            <button type="button" className="query-btn btn btn-primary" onClick={submitQuery}>Submit</button>
            <button 
                button 
                type="button" 
                className="history-btn btn btn-secondary" 
                data-toggle="modal" 
                data-target="#history-modal"
                onClick={showHistory}>
                Show History
            </button>

            {/*History Popup*/}
            <div className="modal" tabIndex="-1" role="dialog" id="history-modal" aria-labelledby="historyModalLabel" aria-hidden="true">
                <ul>
                    {history.map((item, index)=>(
                        <li key={item + index}><p>{item}</p></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;