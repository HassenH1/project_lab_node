const express = require('express');
// const bodyParser = require("body-parser")
const app = express();
var methodOverride = require('method-override')

const Fruits = require('./models/fruits.js');

//set up middleware, 
//middleware are a chain of fucntion that happen to request objects/or response
//app.use to use middleware
//extended false dont allow nested object, just clean data
app.use(express.urlencoded({extended:false}))
// app.use(bodyParser.json())


app.get('/fruits/new', function(req, res) {
    res.render('new.ejs')
})

app.post('/fruits', (req, res) => {

    console.log(Fruits)

    if(req.body.readyToEat === "on"){

        //do this to make it look like data in our model
        //santizing our data
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }

    //create the fruits/ use the model to add it to our db 
    //model to add it to the array 
    //repesenting our db, fruits is our array
    Fruits.push(req.body)
    res.redirect("/fruits")
})

app.use(methodOverride('_method'))


app.delete("/fruits/:index", (req, res) => {
    //our logic to delete
    // console.log(req.params.index)
    Fruits.splice(req.params.index, 1)
    res.redirect("/fruits")
    // res.send("Deleted")
})

app.get('/fruits/:index', function(req, res){
    res.render('show.ejs', { //second param must be an object
        fruit: Fruits[req.params.index] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.index]
    });
});


app.get('/fruits', (req, res) => {
      res.render('index.ejs', {
        fruits: Fruits // thsi fruits comes from the callback
      });

});

app.listen(3000, () => {
    console.log('listening');
});


//GET - 
//GET - new route to create something
//POST - send info to server
//