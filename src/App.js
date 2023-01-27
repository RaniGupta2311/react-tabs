import React,{useState,useEffect} from 'react';
import Loading from './Loading';
import {FaAngleDoubleRight} from "react-icons/fa"
const url="https://course-api.com/react-tabs-project";
function App() {
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState([]);
  const [value,setValue]=useState(0);

  const fetchData=async ()=>{
    setLoading(true);
    try{
    const res=await fetch(url);
    const result=await res.json();
    setData(result);
    setLoading(false);
    // console.log(result)
    }
    catch(error){
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);

  if(loading){
    return <main className="loading"><Loading/></main>
  }

  // destructuring 
  const {company,dates,duties,title}=data[value];

  return <main>
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {
            data.map((item,index)=>{
              return <button key={item.id}
               className={`btn ${index===value && 'active-btn'}`}
              onClick={()=>setValue(index)}>{item.company}</button>
            })
          }
        </div>
        <article className="job-info">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {/* iterating over duties */}
            {duties.map((duty,index)=>{
              return <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"/>
                <p>{duty}</p>
              </div>
            })}
        </article>
      </div>
    </section>
  </main>
}

export default App;
