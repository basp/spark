/// <reference path="typings/tsd.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import levelup = require('levelup');

var JSONStream = require('JSONStream');

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
	let key = 'foo';
	db.put(key, req.body, (err) => {
		if (err) return res.json({ created: false, error: err });
		res.json({ created: true });
	});
});

app.listen(3000);