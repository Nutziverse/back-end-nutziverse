const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const DBconnection = require("./config/");
const routes = require("./routers");
require("dotenv").config();
const { MONGODB_URI } = process.env;

async function main() {
	try {
		await DBconnection(MONGODB_URI);
		const app = express();
		const port = process.env.PORT || 5000;
		app.use(bodyparser.json());
		app.use(bodyparser.urlencoded({ extended: false }));
		app.use(cors());
		app.use(routes);
		app.listen(port, () => {
			console.log(`listening on http://localhost:${port}`);
		});
	} catch (error) {
		console.log("main:", error);
	}
}

main();
