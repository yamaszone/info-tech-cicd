const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

module.exports = app

// version could go here too

// Creating a 'build' object
var buildObject = {
   buildCommit: process.env.CIRCLE_SHA1 || "abc123",
   CIRCLE_BUILD_URL: process.env.CIRCLE_BUILD_URL || "Local Build",
   VERSION: process.env.VERSION || "1.0",
   CIRCLE_USERNAME: process.env.CIRCLE_USERNAME || "Chris Black",
   Github_Repo_Name: process.env.CIRCLE_PROJECT_REPONAME || "DefaultRepo",
   Build_Number: process.env.CIRCLE_BUILD_NUM || "1",
   Workflow_Guid: process.env.CIRCLE_WORKFLOW_ID || "Workflow123",
   CI_PULL_REQUEST: process.env.CI_PULL_REQUEST || "Awesome Pull Request"
}

// another way to pass in vars to app
app.locals.buildObject = buildObject;
app.locals.buildURL = buildObject.CIRCLE_BUILD_URL;


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', (req, res) => res.render('index.ejs'))

app.get('/buildInfo', (req, res) => res.render('buildInfo.ejs'))

app.get('/version', (req, res) => res.json(buildObject))

// allow us to use all static assets
app.use(express.static('public'));
// this might cause issues...
// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.listen(port, host, () => console.log(`Sample application listening on port ${port}!`))
