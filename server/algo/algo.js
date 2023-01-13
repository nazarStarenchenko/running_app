//basic approach 24 weeks season, 4 by 6 weeks 
//we can get priority of weeks from that table. 
//If more than 24 we start over from week 1 every 24 weeks

//fi - foundtation and injury prevetion training
//eq - early quality training
//tg - transition quality training
//fq - final quality training

//programm should be changed based on overall miledge athlete 
//runs every week and number of weeks until the competition.


const number_of_weeks_allocated = {
	fi: 0,
	eq: 0,
	tq: 0,
	fq: 0
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function rounded(number){
    return +number.toFixed(2);
}

const fill_weeks = (number_of_weeks) => {

	let temp_num = number_of_weeks;
	let checked = false;

	const TRAIN_DURATATION = 24;

	const PRIORITY_TABLE = {
		fi: [1,2,3,13,21,23],
		eq: [10,11,12,18,19,20],
		tq: [7,8,9,14,15,16],
		fq: [4,5,6,17,22,24]
	}

	const key_search = (num) => {
		for (let key in PRIORITY_TABLE) {
			if (PRIORITY_TABLE[key].includes(num)) {
				number_of_weeks_allocated[key]++;
				break;
			}
		}
	}

	let cycle_counter = 0;


	if (number_of_weeks > TRAIN_DURATATION && checked == false) {
		checked = true;
		if (number_of_weeks - TRAIN_DURATATION >= 4) {
			temp_num -= 4;
			number_of_weeks_allocated.fi += 4;	
		}else {
			temp_num -= number_of_weeks - TRAIN_DURATATION;
			number_of_weeks_allocated.fi += number_of_weeks - TRAIN_DURATATION;	
		}
	}

	while (temp_num > 0) {
		if (temp_num >= TRAIN_DURATATION) {
			for (let i = 1; i <= TRAIN_DURATATION; i++) {
				key_search(i);
			}
		} else {
			for (let i = 1; i <= temp_num; i++) {
				key_search(i);
			}
		}

		temp_num -= TRAIN_DURATATION;
		cycle_counter++;
	}		
}


let calc_run_arr = (km, number_of_days_per_week) => {
	let arr = []

	for (let i = 0; i < number_of_days_per_week - 1; i++) {
		let min = (km / number_of_days_per_week) - 2;
		let max = (km / number_of_days_per_week) + 2;
		arr[i] = Math.floor(getRandomArbitrary(min, max)) + 1; 
	}

	arr[number_of_days_per_week - 1] = Math.floor(km - arr.reduce((partialSum, a) => partialSum + a, 0));

	return arr;
}

function calc_weekly_arr(km, number_of_days_per_week) {
	let arr = [];
	console.log(km);
	for (let i = 0; i < number_of_days_per_week; i++) {
		arr[i] = rounded(km / number_of_days_per_week); 
	}

	return arr;

}

//fi part of program. In this part working on gradualy building 
//up the intensity and milage of training to avoid injury

function fi_give (start_milage) {
	const result_arr = [];

	let end_milage = Math.floor(0.65 * start_milage + start_milage) + 1;

	let starting_weeks, ending_weeks;
	if (number_of_weeks_allocated.fi % 2 == 1) {
		starting_weeks = Math.floor(number_of_weeks_allocated.fi / 2);
		ending_weeks = number_of_weeks_allocated.fi / 2;
		console.log(`first ${Math.floor(number_of_weeks_allocated.fi / 2)} weeks you run 4 times a week, left ${Math.floor(number_of_weeks_allocated.fi / 2) + 1} weeks you run 5 times a day`);
	} else if ( number_of_weeks_allocated.fi % 2 == 0) {
		starting_weeks = number_of_weeks_allocated.fi / 2;
		ending_weeks = number_of_weeks_allocated.fi / 2;
		console.log(`first ${number_of_weeks_allocated.fi / 2} weeks you run 4 times a week, left ${number_of_weeks_allocated.fi / 2} weeks you run 5 times a day`);
	}

	let diff = end_milage - start_milage;
	let temp_weekly = start_milage;

	let increment = diff / number_of_weeks_allocated.fi + 1 > start_milage * 0.2 ? start_milage * 0.2 : diff / number_of_weeks_allocated.fi + 1;
	for (let i = 1; i <= number_of_weeks_allocated.fi; i++) {
		if (i <= starting_weeks) {
			result_arr.push(`week #${i} e-pace runs: ${calc_run_arr(temp_weekly, 4)}`);
		} else {
			result_arr.push(`week #${i} e-pace runs: ${calc_run_arr(temp_weekly, 5)}`);
		}

		temp_weekly += increment;
	}

	return [result_arr, temp_weekly];

}

//lets write eq part of the algoritm
//take 80% of miledge and allocate it to long distance 3/4 times a week
//other time allocate to other activities
//add general guidelines on how to place training
function get_eq(start_milage) {
	let result_arr = [];
	//get about 0.8 of milage we got in previous section and allocate other to strides and reps
	let increment = start_milage * 0.1;
	let temp_weekly = start_milage;

	if (number_of_weeks_allocated.eq >= 4) {
		result_arr.push(`week #${number_of_weeks_allocated.fi + 1} repetition runs:5 reps 2 times a week of 3X200 meters 2x400 m `);
		result_arr.push(`week #${number_of_weeks_allocated.fi + 2} repetition runs:5 reps 3 times a week of 3x200 meters 2x400 m `);
		result_arr.push(`week #${number_of_weeks_allocated.fi + 3} repetition runs:6 reps 2 times a week of 3X200 meters 3x400 m `);

		for (let i = 3; i < number_of_weeks_allocated.eq; i++) {
			result_arr.push(`week #${number_of_weeks_allocated.fi + i + 1} repetition runs:6 reps 3 times a week of 3X200 meters 3x400 m`);
		}
	} else {
		if (number_of_weeks_allocated.eq == 1) {
			result_arr.push(`week #${number_of_weeks_allocated.fi + 1} repetition runs:5 reps 2 times a week of 3X200 meters 2x400 m `);

		} else if (number_of_weeks_allocated.eq == 2) {
			result_arr.push(`week #${number_of_weeks_allocated.fi + 1} repetition runs:5 reps 2 times a week of 3X200 meters 2x400 m `);
			result_arr.push(`week #${number_of_weeks_allocated.fi + 2} repetition runs:5 reps 3 times a week of 3x200 meters 2x400 m `);
			
		} else if (number_of_weeks_allocated.eq == 3) {
			result_arr.push(`week #${number_of_weeks_allocated.fi + 1} repetition runs:5 reps 2 times a week of 3X200 meters 2x400 m `);
			result_arr.push(`week #${number_of_weeks_allocated.fi + 2} repetition runs:5 reps 3 times a week of 3x200 meters 2x400 m `);
			result_arr.push(`week #${number_of_weeks_allocated.fi + 3} repetition runs:6 reps 2 times a week of 3X200 meters 3x400 m `);
		}
	}

	for (let i = 1; i <= number_of_weeks_allocated.eq; i++) {
		result_arr.push(`week #${number_of_weeks_allocated.fi + i} e-pace runs: ${calc_run_arr(temp_weekly * 0.8, 4)}`);
		temp_weekly += increment;
	}


	return [result_arr, temp_weekly];
}


function get_tq(start_milage) {
	let result_arr = [];
	let temp_weekly = start_milage;
	let starting_weeks, ending_weeks;

	let increment = start_milage * 0.1;

	if (number_of_weeks_allocated.fi % 2 == 1) {

		starting_weeks = Math.floor(number_of_weeks_allocated.eq / 2);
		ending_weeks = number_of_weeks_allocated.eq / 2;
		console.log(`first ${Math.floor(number_of_weeks_allocated.eq / 2)} weeks you run 3 times a week, left ${Math.floor(number_of_weeks_allocated.eq / 2) + 1} weeks you run 4 times a day`);

	} else if ( number_of_weeks_allocated.eq % 2 == 0) {

		starting_weeks = number_of_weeks_allocated.eq / 2;
		ending_weeks = number_of_weeks_allocated.eq / 2;
		console.log(`first ${number_of_weeks_allocated.eq / 2} weeks you run 3 times a week, left ${number_of_weeks_allocated.eq / 2} weeks you run 4 times a day`);
	}

	for (let i = 1; i <= number_of_weeks_allocated.tq; i++) {
		result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + i} e-pace runs: ${calc_run_arr(start_milage * 0.7, 4)}`);
	}

	for (let i = 1; i <= number_of_weeks_allocated.tq; i++) {
		if (i <= starting_weeks) {
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + i} i-pace runs: ${calc_weekly_arr(temp_weekly * 0.08, 3)}`);
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + i} t-pace runs: ${calc_weekly_arr(temp_weekly * 0.1, 3)}`);
		} else {
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + i} i-pace runs: ${calc_weekly_arr(temp_weekly * 0.08, 4)}`);
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + i} t-pace runs: ${calc_weekly_arr(temp_weekly * 0.1, 4)}`);
		}

		temp_weekly += increment;
	}


	return result_arr;
}


function get_fq(start_milage) {

	let result_arr = [];
	let increment = start_milage * 0.1;
	let temp_weekly = start_milage;

	if (number_of_weeks_allocated.fi % 2 == 1) {
		starting_weeks = Math.floor(number_of_weeks_allocated.fi / 2);
		ending_weeks = number_of_weeks_allocated.fi / 2;
		console.log(`first ${Math.floor(number_of_weeks_allocated.fi / 2)} weeks you run 6 times a week, left ${Math.floor(number_of_weeks_allocated.fi / 2) + 1} weeks you run 5 times a day`);
	} else if ( number_of_weeks_allocated.fi % 2 == 0) {
		starting_weeks = number_of_weeks_allocated.fi / 2;
		ending_weeks = number_of_weeks_allocated.fi / 2;
		console.log(`first ${number_of_weeks_allocated.fi / 2} weeks you run 6 times a week, left ${number_of_weeks_allocated.fi / 2} weeks you run 5 times a day`);
	}

	for (let i = 1; i <= number_of_weeks_allocated.fi; i++) {
		if (i <= starting_weeks) {
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + number_of_weeks_allocated.tq + i} e-pace runs: ${calc_run_arr(temp_weekly * 0.7, 4)}`);
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + number_of_weeks_allocated.tq + i} t-pace runs: ${calc_weekly_arr(temp_weekly * 0.15, 2)}`);
		} else {
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + number_of_weeks_allocated.tq + i} e-pace runs: ${calc_run_arr(temp_weekly * 0.7, 3)}`);
			result_arr.push(`week #${number_of_weeks_allocated.fi + number_of_weeks_allocated.eq + number_of_weeks_allocated.tq + i} t-pace runs: ${calc_weekly_arr(temp_weekly * 0.15, 2)}`);
		}

		temp_weekly -= increment;
	}

	return result_arr;
}

//this function returns final program - array of 4 arrays, 
//that contain strings for every part of the program fi, eq, tq, fq
function program(start_milage, number_of_weeks) {
	const result_arr = [];

	fill_weeks(number_of_weeks);
	console.log("FILLED WEEKS", number_of_weeks_allocated);
	let [arr, fi_distance] = fi_give(start_milage);
	result_arr.push(arr);

	let [arr2, eq_distance] = get_eq(fi_distance);
	result_arr.push(arr2);

	let arr3 = get_tq(eq_distance);
	result_arr.push(arr3);

	let arr4 = get_fq(eq_distance);
	result_arr.push(arr4);

	number_of_weeks_allocated.fi = 0;
  number_of_weeks_allocated.eq = 0;
  number_of_weeks_allocated.fq = 0;
  number_of_weeks_allocated.tq = 0;

	return result_arr;
}

module.exports = program;