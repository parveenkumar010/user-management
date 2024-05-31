const express = require("express");
const app = express();
const port = 8000;
const users = require('./MOCK_DATA.json');
const fs = require('fs');
app.get('/',(req,res) => res.send('server is working.'))

app.route('/api/users').get((req,res) => {
    res.json(users);
});

app.use(express.urlencoded({extended: false}))

// html listing of users
app.route('/users').get((req,res) => {
    const userName = `<ul>`+users.map(user => `<li>${user.first_name}</li>`)+`</ul>`;
    res.send(userName);
});

// API for create the user
app.post('/api/user/create', (req, res)=> {
    
    const formData = req.body;
    const userId = users.length+1;
    formData.id = userId;
    users.push(formData);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {console.log(err)})
    res.json({status: 'Success', message: `User Created Successfully with id ${userId}.`});
});

// app.patch('/api/user/:userId',(req, res) => {
//     const userId = req.params.userId;
//     const
//     console.log(userId);
// });

// API for find the user from an array
app.get('/api/user/:userId',(req, res) => {
    const id = req.params.userId;
    const user = users.find(user => user.id == id); 
    res.json(user);
});

// Delete the entry of user from an array
app.delete('/api/user/:userId', (req, res) => {
    const id = req.params.userId;
    const user = users.filter(user=> user.id != id);

    fs.writeFile("MOCK_DATA.json", JSON.stringify(user), (err)=> {console.log(err)});

    res.json({status:'success', message: `User with ID ${id} has been successfully deleted.`})
});


app.listen(port, () => 
    console.log(`Example app listening on port ${port}`)  
);

