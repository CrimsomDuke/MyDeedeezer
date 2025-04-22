const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;
const db = require("./models/")

app.use(bodyParser.urlencoded({ extended : false }))

app.use(fileUpload({
    limits : { fileSize: 50 * 1024 * 1024 }
}))

db.sequelizeInst.sync({}).then(() => {
    console.log("Database Ready for the action")
}).catch((err) => {
    console.error("The Database is dead and we killed it...", err)
})

require("./routes")(app)

app.listen(port, () => {
    console.log(`API started at http://localhost:${port}`)
})