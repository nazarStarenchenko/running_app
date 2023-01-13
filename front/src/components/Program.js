import React from 'react';

//this components displays running program we got from frontend
export default function Program () {

  const [arrToDisplay, setArrToDisplay] = React.useState();
  const [formData, setFormData] = React.useState({"starting_distance" : 0, 
                                                  "number_of_weeks": 0});

  //fetches latest version of algoritm from database 
  React.useEffect(() => {
    (async () => {
      fetch('http://localhost:8080/api/fetch_program')
      .then(res => res.json())
      .then(data => convertDataToJSXArray(data))
      .catch(err => console.log(err));
    })();
  }, []);

  //converts array of string arrays into JSX code, to display on the page
  function convertDataToJSXArray(data) {
    const arr = [];

    for (let i = 0; i < data.length; i++) {

      if (i === 0) {
        arr.push(<h1>FI</h1>)
      } else if(i === 1) {
        arr.push(<h1>EQ</h1>)
      }else if(i === 2) {
        arr.push(<h1>TQ</h1>)
      }else if (i === 3) {
        arr.push(<h1>FQ</h1>)
      }

      for (let j = 0; j < data[i].length; j++) {
        arr.push(<div>{data[i][j]}</div>);
      }
    }
    setArrToDisplay(arr);
  }

  async function handleSubmit(event) {
    //prevent default behavior of sumbit data
    event.preventDefault();

    //send formData to backend end
    const response = await fetch('http://localhost:8080/api/change_algo_params', { 
      method: 'POST', 
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(formData)});
    const string = await response.text();
    const json = string === "" ? {} : JSON.parse(string);
    console.log(json);

    //fetch new algorithm based on user input sent to server earlier
    fetch('http://localhost:8080/api/fetch_program')
    .then(res => res.json())
    .then(data => convertDataToJSXArray(data))
    .catch(err => console.log(err));

    //clear user input fields
    setFormData({"starting_distance" : 0, "number_of_weeks": 0}); 
  }

  //changes data in the formData state
  function handleChange (event) {
    const {name, value, type, checked} = event.target;
    setFormData((oldFromTextObj) => {
      return {...oldFromTextObj, [name]: type === "checkbox" ? checked : value}
    });
  }

  return (
    <>
      <form className="algo_change" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="st">Enter your current mileage</label>
        <input type="number" id="st" name="starting_distance" value={formData["starting_distance"]} onChange={handleChange}/>
        </div>

        <div>
        <label htmlFor="num_weeks">Enter number of weeks until the competition</label>
        <input type="number" id="num_weeks" name="number_of_weeks" value={formData["number_of_weeks"]} onChange={handleChange}/>
        </div>

        <button type="submit">Submit data</button>
      </form>
      <h1>Program algorithm</h1>
      <div className='prog-container'>{arrToDisplay}</div>
    </>
  )
}