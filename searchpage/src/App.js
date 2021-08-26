import "./App.scss";
import { useState } from "react";
import axios from "axios";
import React from "react";

function App() {
  const postUrl =
    "https://57lu3zarij.execute-api.us-east-2.amazonaws.com/dev/data/mydata";

  //const [body, setBody] = useState({});

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("P");

  // const getData = () => {
  //   let temp = [];
  //   axios
  //     .get(getUrl)
  //     .then((response) => {
  //       // console.log(response);
  //       response.data.forEach((val) => {
  //         let x = `${val.Title}`;
  //         temp.push(x);
  //       });
  //       setData(temp);
  //     })
  //     .catch((err) => {
  //       console.log("error ==> ", err);
  //     });
  // };
  const createBody = () => {
    let body = {
      data: search,
      type: searchType,
    };
    return body;
  };

  const getDatabyValue = () => {
    //function :-fetching the data from API using AXIOS wit post method
    let temp = [];
    axios
      .post(postUrl, createBody()) //sending te post URL and the body as parameters
      .then((response) => {
        // console.log(response);
        response.data.forEach((val) => {
          // pushing the response into an array
          let x = `${val.Title}`;
          temp.push(x);
        });
        setData(temp);
      })
      .catch((err) => {
        console.log("error ==> ", err);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search d-flex justify-content-center flex-column p-5 bg-white my-5">
              <input
                type="text"
                className="form-control mb-2 rounded-pill in-box border-0"
                placeholder="search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="d-flex align-items-center gap-3">
                <input
                  type="radio"
                  value="P"
                  onClick={(e) => setSearchType(e.target.value)}
                  name="type"
                  defaultChecked
                />
                Prefix
                {/* set the value of searchType to value of input box*/}
                <input
                  type="radio"
                  value="C"
                  onClick={(e) => setSearchType(e.target.value)}
                  name="type"
                />
                Contains
              </div>
              {/* calling the getDatabyValue function when clicked on Search button */}
              <button
                className="btn btn-primary rounded-pill border-0"
                onClick={getDatabyValue}>
                Search
              </button>

              <section className="p-2">
                {/* mapping the array to show the result on page  */}
                {data.map((val, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="d-flex gap-2">
                        <p>{val}</p>
                        <a href="https://www.google.com" target="_blank" className="link-clr text-decoration-none">
                          Click Here
                        </a>
                      </div>
                    </React.Fragment>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
