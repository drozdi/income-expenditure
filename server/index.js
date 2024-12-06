require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const PORT = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

async function start() {
	try {
		/// ??????
		mongoose.connection.once('open', () => {});
		await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

		console.log(chalk.green(`MongoDB connected.`));

		app.listen(PORT, () =>
			console.log(chalk.green(`Server has been started on port ${PORT}...`)),
		);
	} catch (e) {
		console.log(chalk.red(e.message));
		process.exit(1);
	}
}

start();
