const express = require("express");
const router = express.Router();

const Workout = require('../models/Workout');
const Algo = require('../models/Algo');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

const program = require('../algo/algo.js');

const createToken = (_id) => {
  return jwt.sign({_id}, "hfdgdffdsfdsf", { expiresIn: '3d' })
}

//routing of our API
router.post("/add", async (req, res) => {
    let currentDate = new Date().toLocaleDateString();
    try {
        res.send({result: "good"});
        const workout = new Workout({
          date: currentDate,
          weight: req.body.weight,
          distance: req.body.distance,
          duration: req.body.duration,
          runType: req.body.runType
        })
      
        workout.save();
    } catch (error) {
        res.send(error);
    }
});

router.post("/change_algo_params", async (req, res) => {
    try {
        res.send({result: "changed algo parametras"});
        const algo = new Algo({
          miladge: req.body.starting_distance,
          numberOfWeeks: req.body.number_of_weeks,
          algoString: JSON.stringify(program(parseInt(req.body.starting_distance), parseInt(req.body.number_of_weeks)))
        })
        algo.save();
    } catch (error) {
        res.send(error);
    }
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

router.post("/signup", async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

router.get("/fetch_data", async (req, res) => {
  const workouts = await Workout.find();
	res.json(workouts);
  console.log("sent running data to the frontend");
});

router.get("/get_plot", async (req, res) => {
  const workouts = await Workout.find();

  plot_data_arr = [{x:[], y:[], type: "scatter", name: "weight"}, 
                {x:[], y:[], type: "scatter", name: "distance"}, 
                {x:[], y:[], type: "scatter", name: "duration"}];

  for (workout of workouts) {
    plot_data_arr[0].x.push(workout.date);
    plot_data_arr[1].x.push(workout.date);
    plot_data_arr[2].x.push(workout.date);

    plot_data_arr[0].y.push(workout.weight);
    plot_data_arr[1].y.push(workout.distance);
    plot_data_arr[2].y.push(workout.duration);
  }

	res.json(plot_data_arr);

  console.log("sent data to plot to the frontend");
});

router.get("/fetch_program", async (req, res) => {
  const result = await Algo.find();
  res.json(JSON.parse(result[result.length-1].algoString));
  console.log("sent program to the front end");
});

module.exports = router;