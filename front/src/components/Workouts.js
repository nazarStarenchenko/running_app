import React from 'react';

//this components displays completed workouts
export default function Workouts () {
  const [arrToDisplay, setArrToDisplay] = React.useState();

  //efferct and function used to fetch running data from node js server
  React.useEffect(() => {
    (async () => {
      fetch('http://localhost:8080/api/fetch_data')
      .then(res => res.json())
      .then(data => convertDataToJSXArray(data))
      .catch(err => console.log(err));
    })();
  }, []);

  //this function is used to set array of jsx elements to display
  //jsx elemets in this case are workouts, that user completed
  function convertDataToJSXArray(data) {
    const arr = data.map(val => {
      return <div key={val._id}>
        <h2>Date: {val.date}</h2>
        <p>Weight: {val.weight}</p>
        <p>Distance you ran: {val.distance}</p>
        <p>Duration of a run: {val.duration}</p>
        <p>Type of a run: {val.runType}</p>
      </div>
    });


    setArrToDisplay(arr.reverse());
  }

  return (
    <>
      <div className='workouts'>{arrToDisplay}</div>
    </>
  )
}