/* 
TODO:
    1. create basic campground Schema
    2. create connection to DB
    
*/


const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => {
    res.send("Hello CampIL!")

})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})