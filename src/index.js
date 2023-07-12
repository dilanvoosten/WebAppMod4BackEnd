import express from 'express';
import userRouter from "./routers/user-router.js";
import articleRouter from "./routers/article-router.js";
import categoryRouter from "./routers/category-router.js";
import cors from "cors";
import * as database from "././databaseHandler/databaseConnector.js";
import * as nhf from './nextHandlerFunctions.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// server port
const port = 3000;


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

