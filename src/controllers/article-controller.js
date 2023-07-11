import * as database from ".././databaseHandler/databaseConnector.js";
import currentUser from "../index.js";

// get a list of all articles
export async function getAllArticles(req, res) {
    // call to get all articles function
    const articles = await database.getAllArticles();
    return res.status(200).json(articles);
}

// get an article on title
export async function getArticleOnTitle(req, res) {
    // call to get article on title function
    const article = await database.getArticleOnTitle(req.params.title);
    if (!article) {
        // send error message if there is no article
        return res.status(404).json(`No article found with title: ${req.params.title}`);
    } else {
        return res.status(200).json(article);
    }
}

// get a list of articles by user
export async function getArticlesByUser(req, res) {
    const user = await database.getUserOnUsername(req.params.username);
    // check if user exists
    if (!user) {
        return res.status(404).json(`There is no user with username ${req.params.username}`);
    } else {
        const articles = await database.getArticlesByUser(req.params.username);
        // check if articles are there
        if (!articles) {
            return res.status(404).json(`There are no articles written by ${req.params.username}`);
        } else {
            return res.status(200).json(articles);
        }
    }
}

export async function getArticleByUserAndTitle(req, res) {
    // check if given user exist
    const user = await database.getUserOnUsername(req.params.username);
    if (!user) {
        return res.status(404).json(`There is no user with username ${req.params.username}`);
    } else {
        // check if the article on title exist
        const article = await database.getArticleByUserAndTitle(req.params.username, req.params.title);
        if (!article) {
            return res.status(404).json(`There is no article with title ${req.params.title} written by ${req.params.username}`);
        } else {
            return res.status(200).json(article);
        }
    }
}

// get all articles on category
export async function getArticlesOnCategory(req, res) {
    // check if category exist
    const category = await database.getSpecificCategory(req.params.category);
    if (!category) {
        return res.status(404).json(`The given category ${req.params.category} does not exist`);
    } else {
        // check if articles are there
        const articles = await database.getArticlesOnCategory(req.params.category);
        if (!articles) {
            return res.status(404).json(`There are no articles with the ${req.params.category}`);
        } else {
            return res.status(200).json(articles);
        }
    }
}


// create new article by user
export async function createNewArticle(req, res) {
    // modify data so that it will be in the correct format:
    // title, article_text in list (with header and section), writer, category
    const {articleTitle, articleText, writer, category} = req.body;

    // check if title already exist
    const article = await database.getArticleOnTitle(articleTitle);
    if (article) {
        res.status(403).json(`Article with title ${articleTitle} already exist`);
    } else {
        // check if category already exist, if not create new one
        const checkCat = await database.getSpecificCategory(category);
        if (!checkCat) {
            // create new category
            try {
                await database.createCategory(category);
            } catch (err) {
                return res.status(400).json('Error with creating new category', err);
            }
        } else {
            // create new article
            try {
                await database.createArticle(articleTitle, articleText, category, writer);
                return res.status(200).json('New article created');
            } catch (e) {
                res.status(400).json(`Error while creating new article: ${e}`);
            }
        }
    }
}


// TODO: think about how to edit article the easiest
export async function editArticle(req, res) {
    try {
        // modify data so that it will be in the correct format:
        // title, article_text in list (with header and section), writer, category
        const formData = req.body;
        // put article_text in a list
        formData.articleText = '{ "text" : "' + formData.articleText + '", "header" : "' + formData.articleHeader + '", "section" : "' + formData.articleSection + '" }';
        // formData.articleText = 'Test article text';
        formData.writer = currentUser.username;

        req.body = formData;

        const row = database.prepare(`SELECT *
                                      FROM articels
                                      WHERE title = ?;`).get(req.params.title);
        // check if article exist
        if (row) {
            database.prepare(`UPDATE articles
                              SET title        = ?,
                                  article_text = ?,
                                  writer       = ?,
                                  category     = ?
                              WHERE title = ?`).run(
                req.body.articleTitle,
                req.body.articleText,
                req.body.writer,
                req.body.category,
                req.params.title);
            res.status(200).send('Article has been updated');
        } else {
            res.status(404).send('There is no article with this title');
        }
    } catch (e) {
        res.status(400).send(`Error while updating article: ${e}`);
    }

    // modify data so that it will be in the correct format:
    // title, article_text in list (with header and section), writer, category
    const {title, articleText, header, section, writer, category} = req.body;
    // create article_text as formatted
    const formatted_text = {
        "text": articleText,
        "header": header,
        "section": section
    }

    // check if article even exist
    const article = await database.getArticleOnTitle(title);
    if (!article) {
        return res.status(404).json(`Article with this title ${title} does not exist`);
    } else {
        // check which parts to change and do accordingly
        try {
            if (title !== undefined) {
                // update title

            }
        } catch (err) {
            return res.status(400).json('Error with changing article', err);
        }
    }
}

export async function deleteOnUsername(req, res) {
    // check if user even exist
    const user = await database.getUserOnUsername(req.params.username);
    if (!user) {
        return res.status(404).json(`The user with username ${req.params.username} does not exist`);
    } else {
        // delete articles by user
        try {
            await database.deleteArticlesByUser(req.params.username);
            return res.status(204).json('Articles successfully deleted');
        } catch (err) {
            return res.status(400).json('Error while deleting articles', err);
        }
    }
}

export async function deleteOnTitle(req, res) {
    // check if article exist
    const article = await database.getArticleOnTitle(req.params.title);
    if (!article) {
        return res.status(404).json(`Article with title ${req.params.title} does not exist`);
    } else {
        // delete article on title
        try {
            await database.deleteArticleOnTitle(req.params.title);
            return res.status(204).json(`Article successfully deleted`)
        } catch (err) {
            return res.status(400).json('Error while deleting article', err);
        }
    }
}