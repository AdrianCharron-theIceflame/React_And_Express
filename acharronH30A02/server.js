"use strict";

const express = require(`express`)
const path = require(`path`)
const app = express()
const PORT = 8888
const WEBROOT = path.join(__dirname, `client`, `build`)
app.use(express.static(WEBROOT))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})