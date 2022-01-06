require("dotenv").config();
const express = require('express');
const uuid = require('uuid');
const getConnection = require("./config");
const cors = require("cors");
const {body, validationResult} = require("express-validator");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.post("/create-post",[
    body("testtable_email").isLength({min: 5, max: 256}),
    // body("testtable_msg").isLength({min:10, max: 2048}),

] ,async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    let testtable_email = req.body.testtable_email;
    let testtable_msg = req.body.testtable_msg;

    const dbConnection = await getConnection();
    await dbConnection.query('INSERT INTO testtable SET ?',[
        {testtable_id: uuid.v4(), testtable_email, testtable_msg}
    ]);

    dbConnection.release();
    

    return res.status(201).json({message: 'Post sucessfully created'});
})


app.listen(PORT, () => {
    console.log("Server started..." + `on port ${PORT}`);
})