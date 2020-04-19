"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM registration', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		configure.questions[i].question = results[i].question;
		configure.questions[i].answers = JSON.parse(results[i].answers);
		configure.questions[i].true_answer = results[i].true_answer;
		configure.loaded_register_question_count++;
	}
	console.log('[I] Loaded registrationQuestions: ' + configure.loaded_register_question_count.toString());

	function shuffle(array) {
		for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
		return true;
	}

	shuffle(configure.questions);

	console.log('[I] Shuffle registrationQuestions: ' + configure.loaded_register_question_count.toString());

});
