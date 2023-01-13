const tasks = require("./routers/router");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Workout = require('./models/Workout');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mern_db', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(console.error);

app.use("/api/", tasks);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));


