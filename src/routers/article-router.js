import * as articleC from '../controllers/article-controller.js';
import express from "express";

const router = express.Router();
import * as nhf from '../nextHandlerFunctions.js';

// get call to retrieve all articles
router.get('/articles', articleC.getAllArticles);

// get call to retrieve article on title
router.get('/articles/:title', articleC.getArticleOnTitle);

// get call to retrieve all articles by user
router.get('/articles/writers/:username', articleC.getArticlesByUser);

// get call to retrieve specific article by a user
router.get('/users/:username/:title', articleC.getArticleByUserAndTitle);

// get call to retrieve all articles of a category
router.get('/articles/categories/:category', articleC.getArticlesOnCategory);

// post call to create new article/
router.post('/articles', articleC.createNewArticle);

// put call to update article
router.put('/articles/:title', nhf.sixParam, articleC.editArticle);

// delete call to delete all articles from user
router.delete('/articles/:username', articleC.deleteOnUsername);

// delete call to delete an article on title
router.delete('/articles/:title', articleC.deleteOnTitle);


//exports
export default router;