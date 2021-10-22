import React, {useState} from 'react';

const Home = () => {

    const [query, setQuery] = useState(""); //Stores input query
    const [history, setHistory] = useState([]); //Stores last 10 query results.

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    }

    const submitQuery = () => {

    }

    const showHistory = () => {

    }

    return (
        <div>
            <h1>Magic 8-Ball</h1>

            <image src=""/>
            
            {/*Query Result*/}
            <h2></h2>

            <input placeholder="Ask a question" value={query} onChange={handleQueryChange}/>

            <button type="submit" onClick={submitQuery}>Submit</button>
            <button onClick={showHistory}>Show History</button>

        </div>
    );
}

export default Home;