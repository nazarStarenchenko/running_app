import React from 'react';

//this components displays form we use to add new completed workouts to DB
export default function Main () {

  const [formData, setFormData] = React.useState({"weight" : 0, 
                                                  "distance": 0, 
                                                  "duration": 0, 
                                                  "runType": ""});

  //changes data in the formData state
  function handleChange (event) {
    const {name, value, type, checked} = event.target;
    setFormData((oldFromTextObj) => {
      return {...oldFromTextObj, [name]: type === "checkbox" ? checked : value}
    });
  }

  async function handleSubmit (event) {
    //prevent default behavior of sumbit data
    event.preventDefault();

    //send form data to the server to store it in DB
    const response = await fetch('http://localhost:8080/api/add', { 
    method: 'POST', 
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(formData)});

    //get response from the server
    const string = await response.text();
    const json = string === "" ? {} : JSON.parse(string);
    console.log(json);
  }


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="weight">Enter your weight for the workout</label>
        <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange}/>
        </div>

        <div>
        <label htmlFor="distance">Enter distance you ran in km</label>
        <input type="number" id="distance" name="distance" value={formData.distance} onChange={handleChange}/>
        </div>

        <div>
        <label htmlFor="duration">Enter duration of your run(minutes)</label>
        <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange}/>
        </div>

        <fieldset> 
          <legend>Type of a run</legend>
          <div>
            <input 
                type="radio"
                id="easy"
                name="runType"
                value="easy run"
                checked={formData.runType === "easy run"}
                onChange={handleChange}
            />
            <label htmlFor="easy">Easy run</label>
          </div>

          <div>
            <input 
                type="radio"
                id="repetition"
                name="runType"
                value="repetition run"
                checked={formData.runType === "repetition run"}
                onChange={handleChange}
            />
            <label htmlFor="repetition">Repetition run</label>
          </div>

          <div>
            <input 
                type="radio"
                id="threshold"
                name="runType"
                value="threshold run"
                checked={formData.runType === "threshold run"}
                onChange={handleChange}
            />
            <label htmlFor="threshold">Threshold run</label>
          </div>

          <div>
            <input 
                type="radio"
                id="interval"
                name="runType"
                value="Interval run"
                checked={formData.runType === "Interval run"}
                onChange={handleChange}
            />
            <label htmlFor="interval">Interval run</label>
          </div>
        </fieldset>

        <button type="submit">Submit data</button>
      </form>
    </main>
  )
}