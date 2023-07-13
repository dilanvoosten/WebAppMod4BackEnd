import express from 'express';
import indexRouter from "./routers/index-router.js";
import userRouter from "./routers/user-router.js";
import articleRouter from "./routers/article-router.js";
import categoryRouter from "./routers/category-router.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// server port
const port = 3000;

// use endpoints of index page
app.use(indexRouter);
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

