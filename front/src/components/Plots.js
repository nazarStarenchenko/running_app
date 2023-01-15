import React from "react";
import Plot from 'react-plotly.js';


export default function Plots () {

  const [arrToDisplay, setArrToDisplay] = React.useState();
    //used to fetch plot data from node js server
    React.useEffect(() => {
      (async () => {
        fetch('http://localhost:8080/api/get_plot')
        .then(res => res.json())
        .then(data => setArrToDisplay(data))
        .catch(err => console.log(err));
      })();
    }, []); 

  return (
    <>
      <div className="plot">
        <Plot
          data={arrToDisplay}
          layout={ {width: 1150, height: "auto", title: 'Weight, Distance and Run duration Plot'} }
        /> 
      </div>
    </>
  );
}