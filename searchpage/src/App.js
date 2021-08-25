import logo from './logo.svg';
import './App.scss';
import {useState} from 'react';
import JSONDATA from './MOCK_DATA.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function App() {
  const[searchWord, setSearchWord]=useState("")

  const[dataJson,setdataJson]=useState({})
  const getUrl= "https://57lu3zarij.execute-api.us-east-2.amazonaws.com/dev/data";
  const postUrl="https://57lu3zarij.execute-api.us-east-2.amazonaws.com/dev/data/mydata" ; 
  var body={
    "id": 5
  }
  const fetchData = () => {
    axios.get(getUrl).then((response) => {
      setdataJson(response.data)
      
    })
    // var temp={`${response.data.Title} ${response.data.b}`}
    
  }
  const getDatabyValue = () => {
    axios
      .post(
        postUrl,body             
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error ==> ", err);
      });
      
  };

  

  return (
    <div className="App">
      <div class="container">
          <div class="row height d-flex justify-content-center align-items-center">
              <div class="col-md-8">
                  <div class="search d-flex justify-content-center flex-column p-5 bg-white my-5"> 
                    <i class="fa fa-search"></i> 
                    <input type="text" class="form-control mb-2 rounded-pill in-box border-0" placeholder="search..."  onChange={(event)=>{
                        setSearchWord(event.target.value);
                      }}/> 
                      {/* <FontAwesomeIcon icon={["fal", "coffee"]} /> */}
                      <button class="btn btn-primary rounded-pill border-0" onClick={fetchData}>Search</button> 
                    {                
                      // Object.keys(dataJson).map((e,i)=>{
                      //   console.log(e,i)
                      // })
                      // data.map((element) => {
                      //   console.log(data)
                      // })
                    }
                  
                    {/* {JSONDATA.filter((val)=>{
                      if(searchWord==="")
                        return val
                      else if(val.first_name.toLowerCase().startsWith(searchWord.toLowerCase()))  {
                        return val
                      }
                    }).map((val,key)=>{
                      return(
                        <div className="user" key={key}>
                          <p>{val.first_name+" "+val.email}</p>
                        </div>
                      );
                    })} */}
                    
                  </div>
              </div>
          </div>
      </div>
     
        
    </div>
  );
}

export default App;
