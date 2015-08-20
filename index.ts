/// <reference path="typings/tsd.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import levelup = require('levelup');
import JSONStream = require('JSONStream');
import moment = require('moment');

var db = levelup('./data', {
	valueEncoding: 'json'
});

var app = express();

app.use(bodyParser.json());

app.get('/api/events/:collection', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	db.createReadStream({
		start: req.params.collection + '-',
		end: req.params.collection + '-~'
	}).
	pipe(JSONStream.stringify()).
	pipe(res);
});

app.post('/api/events/:collection', (req, res) => {
	let key = req.params.collection + '-' + moment().format('x');
	db.put(key, req.body, (err) => {
		if (err) return res.json({ created: false, error: err });
		res.json({ created: true });
	});
});

app.listen(3000);