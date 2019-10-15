const express = require('express');
const app = express();

const Fruits = require('./models/fruits.js');



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
