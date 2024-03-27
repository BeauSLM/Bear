import React, {useEffect, useState} from 'react';
import './ChatBox.css'
function UserSearch() {

    useEffect(() => {
        fetch('http://localhost:3001/user') // http://localhost:3001/user
        .then(res => res.json())
        .then(data => {
            setFilterResults(data);
            
        })
        .catch(err => console.log(err));
       
    }, [])
    const [results, setResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const handleFilter = (value) => {
        if(value.length > 0)
        {
        const re = RegExp(`^${value.toLowerCase().split('').join('')}.*`)
        const res = filterResults.filter(f => f.name.toLowerCase().match(re));
        setResults(res);
        }
        else
            setResults([]);
    }
    return (
        <div className='search__top'>
            <div className='searchbar' >
                <input className="searchbar_input" type="text" placeholder='Search' onChange={e => handleFilter(e.target.value)}/>
            </div>
            <div className='search__results'>
                {results.map((d,i)=> (
                    <div key={i}>
                        {d.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default UserSearch;