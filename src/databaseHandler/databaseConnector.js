import Database from "better-sqlite3";
import * as queries from "./queries.js";


// initiate the connection to the database
let database;
try {
    database = new Database('../database/wa_database.sqlite');
} catch (e) {
    console.error('Error while initializing database!', e);
    throw e;
}

// create users table
database.prepare(`CREATE TABLE IF NOT EXISTS users
                  (
                      username TEXT PRIMARY KEY,
                      password TEXT NOT NULL,
                      role     TEXT,
                      CONSTRAINT unique_user UNIQUE (username)
                  );`).run();

// create articles table
database.prepare(`CREATE TABLE IF NOT EXISTS articles
                  (
                      title        TEXT PRIMARY KEY,
                      article_text TEXT NOT NULL,
                      writer       TEXT,
                      category     TEXT,
                      CONSTRAINT unique_title UNIQUE (title),
                      FOREIGN KEY (writer) REFERENCES users (username),
                      FOREIGN KEY (category) REFERENCES categories (category)
                  );`).run();

// create category
database.prepare(`CREATE TABLE IF NOT EXISTS categories
                  (
                      category TEXT PRIMARY KEY,
                      CONSTRAINT unique_cat UNIQUE (category)
                  );`).run();

/*
    Functions of the User
 */
export function getSpecificUser(username, password) {
    return database.prepare(queries.getSpecificUser).get(username, password);
}

export function getAllUsers() {
    return database.prepare(queries.getAllUsers).all();
}

export function getUserOnUsername(username) {
    return database.prepare(queries.getUserOnUsername).get(username);
}

export function createUser(username, password, role) {
    database.prepare(queries.addNewUser).run(username, password, role);
}


export function updateUsername(newUsername, oldUsername) {
    database.prepare(queries.updateUsername).run(newUsername, oldUsername);
}

export function updatePassword(username, newPassword) {
    database.prepare(queries.updatePassword).run()
}

export function updateUsernameAndPassword(newUsername, newPassword, oldUsername) {
    database.prepare(queries.updateUsernameAndPassword).run(newUsername, newPassword, oldUsername);
}

export function deleteUser(username) {
    database.prepare(queries.deleteUser).run(username);
}

/*
    Functions of a Category
 */
export function getAllCategories() {
    return database.prepare(queries.getAllCategories).all();
}

export function createCategory(category) {
    database.prepare(queries.addCategory).run(category);
}

export function updateCategory(newCategory, oldCategory) {
    database.prepare(queries.editCategory).run(newCategory, oldCategory);
}

export function deleteCategory(category) {
    database.prepare(queries.deleteCategory).run(category);
}

/*
    Functions of an Article
 */

export default database;