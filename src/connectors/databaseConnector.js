import Database from "better-sqlite3";

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

export default database;