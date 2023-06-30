// module for making all the queries that are used for the database

export const getSpecificUser = `SELECT *
                                FROM users
                                WHERE username = ?
                                  AND password = ?;`;

export const getAllUsers = `SELECT *
                            FROM users;`;

export const getUserOnUsername = `SELECT *
                                  FROM users
                                  WHERE username = ?;`;

export const addNewUser = `INSERT INTO users (username, password, role)
                           VALUES (?, ?, ?);`;

export const updateUsername = `UPDATE users
                               SET username = ?
                               WHERE username = ?;`;    // old username

export const updatePassword = `UPDATE users
                               SET password = ?
                               WHERE username = ?;`;

export const updateUsernameAndPassword = `UPDATE users
                                          SET username = ?,
                                              password = ?
                                          WHERE username = ?;`;     // old username

export const deleteUser = `DELETE
                           FROM users
                           WHERE username = ?;`;

export const getAllCategories = `SELECT *
                                 FROM categories;`;

export const addCategory = `INSERT INTO categories (category)
                            VALUES (?);`;

export const editCategory = `UPDATE categories
                             SET category = ?
                             WHERE category = ?;`;  // old category

export const deleteCategory = `DELETE
                               FROM categories
                               WHERE category = ?;`;

export const getAllArticles = `SELECT *
                               FROM articles;`;

export const getArticleOnTitle = `SELECT *
                                  FROM articles
                                  WHERE title = ?;`;

export const getArticlesByUser = `SELECT *
                                  FROM articles
                                  WHERE writer = ?;`;   // username of the writer

export const getArticleByUserAndTitle = `SELECT *
                                         FROM articles
                                         WHERE writer = ?
                                           AND title = ?;`;

export const getArticlesOnCategory = `SELECT *
                                      FROM articles
                                      WHERE category = ?;`;

export const addArticle = `INSERT INTO articles (title, article_text, writer, category)
                           VALUES (?, ?, ?, ?);`;

export const updateTitle = `UPDATE articles
                            SET title = ?
                            WHERE title = ?;`;  // old title

export const updateArticleText = `UPDATE articles
                                  SET article_text = ?
                                  WHERE title = ?;`;

export const updateCategory = `UPDATE articles
                               SET category = ?
                               WHERE title = ?;`;

export const updateArticle = `UPDATE articles
                              SET title        = ?,
                                  article_text = ?,
                                  category     = ?
                              WHERE title = ?;`;    // old title

export const deleteArticleOnTitle = `DELETE
                                     FROM articles
                                     WHERE title = ?;`;


