import database from ".././databaseHandler/databaseConnector.js";
import currentUser from "../index.js";

// get a list of all articles
export function getAllArticles(req, res) {
    res.status(200).json(database.prepare(`SELECT *
                                           FROM articles`).all());
}

// get an article on title
export function getArticleOnTitle(req, res) {
    const row = database.prepare(`SELECT *
                                  FROM articles
                                  WHERE title = ?;`).get(req.params.title);
    // check if there is an article with given title
    if (row) {
        res.status(200).json(row);
    } else {
        res.status(404).send('No article found with given title');
    }
}

// get a list of articles by user
export function getArticlesByUser(req, res) {
    const row = database.prepare(`SELECT *
                                  FROM users
                                  WHERE username = ?;`).get(req.params.username);
    // check user exists
    if (row) {
        res.status(200).json(database.prepare(`SELECT *
                                               FROM articles
                                               WHERE writer = ${req.params.username};`).all());
    } else {
        res.status(404).send('User not found');
    }
}

export function getArticleByUserAndTitle(req, res) {
    const user = database.prepare(`SELECT *
                                   FROM users
                                   WHERE username = ?;`).get(req.params.username);

    // check if given user exists
    if (user) {
        const title = database.prepare(`SELECT *
                                        FROM articles
                                        WHERE title = ?;`).get(req.params.title);

        // check if article exists
        if (title) {
            res.status(200).json(database.prepare(`SELECT *
                                                   FROM articles
                                                   WHERE title = ?
                                                     AND writer = ?`).get(
                    req.params.title,
                    req.params.username
                )
            );
        } else {
            res.status(404).send('Article not found');
        }
    } else {
        res.status(404).send('User not found');
    }
}

// get all articles on category
export function getArticlesOnCategory(req, res) {
    const cat = database.prepare(`SELECT *
                                  FROM categories
                                  WHERE category = ?;`).get(req.params.category);

    // check if category exist
    if (cat) {
        const article = database.prepare(`SELECT *
                                          FROM articles
                                          WHERE category = ?;`).get(req.params.category);
        // check if there is any article with this category
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).send('There is no article with this category');
        }
    } else {
        res.status(404).send('This category does not exist');
    }
}


// create new article by user
export function createNewArticle(req, res) {
    try {
        // modify data so that it will be in the correct format:
        // title, article_text in list (with header and section), writer, category
        const formData = req.body;
        // put article_text in a list
        formData.articleText = '{ "text" : "' + formData.articleText + '", "header" : "' + formData.articleHeader + '", "section" : "' + formData.articleSection + '" }';
        // formData.articleText = 'Test article text';
        formData.writer = currentUser.username;

        req.body = formData;

        // check if article already exists, if not create new one
        const row = database.prepare(`SELECT *
                                      FROM articles
                                      WHERE title = ?;`).get(req.body.articleTitle);
        if (!row) {
            // check if category already exists, if not create a new one
            const categoryRow = database.prepare(`SELECT *
                                                  FROM categories
                                                  WHERE category = ?;`).get(req.body.category);
            if (!categoryRow) {
                database.prepare(`INSERT INTO categories(category)
                                  VALUES (?);`).run(req.body.category);
            }

            // add new article to table
            database.prepare(`INSERT INTO articles(title, article_text, writer, category)
                              VALUES (?, ?, ?, ?);`).run(
                req.body.articleTitle,
                req.body.articleText,
                req.body.writer,
                req.body.category
            );
            res.status(200).send('New article created');
        } else {
            res.status(403).send(`Article with this title already exists!`);
        }
    } catch (e) {
        res.status(400).send(`Error while creating new article: ${e}`);
    }
}

export function editArticle(req, res) {
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
}

export function deleteOnUsername(req, res) {
    const user = database.prepare(`SELECT *
                                   FROM users
                                   WHERE username = ?;`).get(req.params.username);
    // check if user exist
    if (user) {
        const article = database.prepare(`SELECT *
                                          FROM articles
                                          WHERE writer = ?;`).get(req.params.username);
        // check if user made any articles
        if (article) {
            database.prepare(`DELETE
                              FROM articles
                              WHERE writer = ?;`).run(req.params.username);
            res.status(204).send('Deleted all articles from user');
        } else {
            res.status(404).send('No articles found');
        }
    } else {
        res.status(404).send('User not found');
    }
}

export function deleteOnTitle(req, res) {
    const row = database.prepare(`SELECT *
                                  FROM articles
                                  WHERE title = ?;`).get(req.params.title);
    // check if article exist
    if (row) {
        database.prepare(`DELETE
                          FROM articles
                          WHERE title = ?;`).run(req.params.title);
        res.status(204).send('Article deleted');
    } else {
        res.send(404).send('Article not found');
    }
}