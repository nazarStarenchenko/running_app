import React from "react";
import { Link } from "react-router-dom";

//this component contains links to other components
export default function Header () {
  return (
    <header>
      <h1>Running app</h1>
      <nav>
        <ol>
          <li><Link to="/">Add workout session</Link></li>
          <li><Link to="/description">Training description</Link></li>
          <li><Link to="/workouts">Workout display</Link></li>
          <li><Link to="/program">Program</Link></li>
          <li><Link to="/plots">Plot data</Link></li>
        </ol>
      </nav>
    </header>
  )
}