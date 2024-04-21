import MyNav from './MyNav';
import LearnPage from './LearnPage';
import Container from 'react-bootstrap/Container'
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import useFetch from './useFetch';


function App() {

  const [page, setPage] = useState(1);

  const { data: content, isPending, error } = useFetch('http://127.0.0.1:5000/data/hue/learn');


  return (
    <div className="App">
      <MyNav />
      <div className="flex">
        <Sidebar />
        <div id='content'>
          { !content && isPending ? <h1>Loading Page...</h1> : <h1>{error}</h1> }
          { !error && content && Object.keys(content).length !== 0 && <LearnPage content={content[page]} />}
        </div>
      </div>

        
      </div>
  );
}

export default App;
