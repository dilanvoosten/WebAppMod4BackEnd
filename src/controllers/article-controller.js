import * as database from ".././databaseHandler/databaseConnector.js";
// import currentUser from "../index.js";

// get a list of all articles
export async function getAllArticles(req, res) {
    // call to get all articles function
    const articles = await database.getAllArticles();
    if (!articles) {
        return res.status(404).json('No articles found in the system');
    } else {
        return res.status(200).json(articles);
    }
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

    // check if writer exist as user in the database
    const user = await database.getUserOnUsername(writer);
    if (!user) {
        res.status(403).json(`User with username "${writer}" does not exist`);
    } else {
        // check if title already exist
        const article = await database.getArticleOnTitle(articleTitle);
        if (article) {
            res.status(403).json(`Article with title "${articleTitle}" already exist`);
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