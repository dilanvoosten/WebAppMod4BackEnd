import express from 'express';
import userRouter from "./routers/user-router.js";
import articleRouter from "./routers/article-router.js";
import categoryRouter from "./routers/category-router.js";
import cors from "cors";
import database from "././databaseHandler/databaseConnector.js";
import * as nhf from './nextHandlerFunctions.js';

const app = express();
app.use(cors());
app.use(express.json());

// server port
const port = 3000;

// variable for current user in session
let currentUser;

// Root endpoint
app.get('/', (req, res) => {
    res.json({"message": "Ok"});
});

// post login credentials to be checked
app.post('/', nhf.twoParam, (req, res) => {
    const row = database.prepare(`SELECT *
                                  FROM users
                                  WHERE username = ?
                                    AND password = ?`).get(
        req.body.username,
        req.body.password
    );

    if (row) {
        console.log({success: true, message: 'Login successful', user: row});
        currentUser = row;
        res.redirect('/home');
    } else {
        res.status(401).json({success: false, message: 'Incorrect username or password'});
    }
});

// use endpoints for user
app.use(userRouter);
// use endpoints for article
app.use(articleRouter);
// use endpoints for category
app.use(categoryRouter);

// start server
app.listen(port, () => {
    console.log(`Server running on port : ${port}.`);
});

export default currentUser;
