import React from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    useNavigate
  } from 'react-router-dom';
import { Students } from "./App";  
import Teachers from "./Teacher";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <button><Link to="/" style={{color:"white", width:"50px",padding:"7.5px"}}>Home</Link></button>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
    const navigate = useNavigate();
    return (
      <>
        <h3> Click respective button based on your role.(Students/Teachers)</h3>

        <button
            onClick={() =>
            navigate('/students')
            }
        >Students
        </button>
        <button
            onClick={() =>
            navigate('/teachers')
            }
        >Teachers
        </button>
        &nbsp;
        </>
    );
  }