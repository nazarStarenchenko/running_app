const express = require("express");
const router = express.Router();

const Workout = require('../models/Workout');
const Algo = require('../models/Algo');
const program = require('../algo/algo.js');


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

router.get("/", async (req, res) => {
  console.log("good");
});

router.get("/fetch_data", async (req, res) => {
  const workouts = await Workout.find();
	res.json(workouts);
  console.log("sent running data to the frontend");
});

router.get("/fetch_program", async (req, res) => {
  const result = await Algo.find();
  res.json(JSON.parse(result[result.length-1].algoString));
  console.log("sent program to the front end");
});



module.exports = router;