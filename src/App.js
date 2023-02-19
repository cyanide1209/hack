import React, { useState,useEffect } from 'react';
import './App.css';
import apiRequest from "./components/apiRequest";

function App() {
  const [testData,setTestData] = useState([
    {id:1,EIN:1818,OVERHEAD_COST:"charity_1",PRGM_SERVICE:15,TOTAL_EXPENSE:32,TOTAL_REVENUE:20},
    {id:2,EIN:1818,OVERHEAD_COST:"charity_1",PRGM_SERVICE:129295,TOTAL_EXPENSE:32,TOTAL_REVENUE:20},
    {id:3,EIN:1818,OVERHEAD_COST:"charity_1",PRGM_SERVICE:15,TOTAL_EXPENSE:32,TOTAL_REVENUE:20},
    {id:4,EIN:1818,OVERHEAD_COST:"charity_1",PRGM_SERVICE:15,TOTAL_EXPENSE:32,TOTAL_REVENUE:20}
  ]);
  const [sortOrder,setSortOrder] = useState(0)
  const [page,setPage] = useState(0)
  
  useEffect(()=>{
    apiRequest("","DESC="+sortOrder+"&PAGE="+page).then(
    (data)=>{
      console.log(data)
      setTestData(data);
    }
  )},[sortOrder,page]);
  return (
    <div>
      <Header />
      <div id="GUIcont">
        <div onClick={()=>{setSortOrder(sortOrder ^ 1)}}>{sortOrder == "0" ? "ASC" : "DESC"}</div>
        <div><span onClick={()=>{setPage(Math.max(0,page-1))}}>← </span>{page+1}<span onClick={()=>{setPage(page+1)}}> →</span></div>
      </div>
      <div id='bodyCont'>
        <NavBar/>
        <div id="tableCont">
        <table>
          <thead>
            <tr>
              <th>EIN</th>
              <th>Overhead Cost</th>
              <th>Program Service</th>
              <th>Total Expense</th>
              <th>Total Revenue</th>
              <th>Efficiency %</th>
            </tr>
          </thead>
          <tbody>
            {
              testData.map((row)=>(
              <tr id={row["id"]}>
                <td>{row["EIN"]}</td>
                <td>{row["OVERHEAD_COST"]}</td>
                <td>{row["PRGM_SERVICE"]}</td>
                <td>{row["TOTAL_EXPENSE"]}</td>
                <td>{row["TOTAL_REVENUE"]}</td>
                <td style={{backgroundColor: ((Number((row["RATIO"]))*100).toPrecision(5)) > 90 ? 'green':'red'}}>
                            {(Number((row["RATIO"]))*100).toPrecision(5)}</td>
              </tr>
              )) 
            }
            <tr id="lastRow"><td>Use</td><td>Next</td><td>Page</td></tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div id='pageHeader'>
      <h1>Fund Facts</h1>
    </div>
  );
}


function NavBar() {
  return(
    <div id='navBar'>
      <div>
        <div><u>EIN</u> - Employer ID</div><br></br>
        <div><u>Overhead Cost</u> - expenses not directly affecting the community (ex: salaries)</div><br></br>
        <div><u>Program Service</u> - expenses associated with helping the community</div><br></br>
        <div><u>Total Expenses</u> - total money spent</div><br></br>
        <div><u>Total Revenue</u> - total money made</div><br></br>
        <div><u>Ratio</u> - Overhead/total expenses</div><br></br>
        <div>
          (The higher the ratio, the more the charity is spending on their programs as opposed to overhead)
        </div>
        <div>
          We have more than 342,920 records stored on our database.
        </div>
      </div>
      <div id="sources">
        Sources: 
        <a href="http://20.171.25.176:8070/nonProfitCollapse.csv">Crunched</a> | 
        <a href="https://www.irs.gov/statistics/soi-tax-stats-annual-extract-of-tax-exempt-organization-financial-data">Full</a>
      </div>
    </div>
  );
}



export default App;

