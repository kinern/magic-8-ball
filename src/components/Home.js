import React, {useState} from 'react';
import axios from 'axios';

const Home = () => {

    const [query, setQuery] = useState(""); //Stores input query.
    const [result, setResult] = useState(""); //Stores answer from query.
    const [history, setHistory] = useState([]); //Stores last 10 query results.

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }

    const submitQuery = () => {
        const url = 'https://8ball.delegator.com/magic/JSON/';
        axios.get(url + query).then(res => {
            const resultString = res.data.magic.answer;
            updateHistory(resultString);
            setResult(resultString);
        });
    }

    const updateHistory = (resultString) => {
        const historyTemp = history;
        historyTemp.push(resultString); //Adds last result
        if (historyTemp.length > 10){
            historyTemp.shift(); //Removes first result.
        }
        setHistory(historyTemp);
    }

    const showHistory = () => {

    }

    return (
        <div>
            <h1>Magic 8-Ball</h1>

            <image src=""/>
            
            {/*Query Result*/}
            <h2>{result}</h2>

            <input placeholder="Ask a question" value={query} onChange={handleQueryChange}/>

            <button type="submit" onClick={submitQuery}>Submit</button>
            <button onClick={showHistory}>Show History</button>

            {/*History Popup*/}
            <div>
                <ul>
                    {history.map((item)=>(
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;