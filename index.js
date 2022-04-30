const config = require("config");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/logging")();


const port = process.env.PORT || config.get("port");;
app.listen(port, () => console.log(`Listening on port ${port}...`));