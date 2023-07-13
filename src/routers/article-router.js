import * as articleC from '../controllers/article-controller.js';
import express from "express";

const router = express.Router();

// get call to retrieve all articles
router.get('/articles', articleC.getAllArticles);

// get call to retrieve article on title
router.get('/articles/:title', articleC.getArticleOnTitle);

// get call to retrieve all articles by user
router.get('/users/:username/articles', articleC.getArticlesByUser);

// get call to retrieve specific article by a user
router.get('/users/:username/articles/:title', articleC.getArticleByUserAndTitle);

// get call to retrieve all articles of a category
router.get('/articles/categories/:category', articleC.getArticlesOnCategory);

// post call to create new article/
router.post('/articles', articleC.createNewArticle);

// delete call to delete all articles from user
router.delete('/users/:username/articles', articleC.deleteOnUsername);

// delete call to delete an article on title
router.delete('/articles/:title', articleC.deleteOnTitle);


//exports
export default router;