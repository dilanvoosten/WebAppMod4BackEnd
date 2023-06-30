import database from ".././databaseHandler/databaseConnector.js";

export function getAllCategories(req, res) {
    res.status(200).json(database.prepare(`SELECT *
                                           FROM categories;`).all()
    );
}

export function createCategory(req, res) {
    // check if category already exist, if not create new one
    const row = database.prepare(`SELECT *
                                  FROM categories
                                  WHERE category = ?;`).get(req.body.category);
    if (row) {
        res.status(403).send('Category already exist');
    } else {
        try {
            database.prepare(`INSERT INTO categories (category)
                              VALUES (?);`).run(req.body.category);
            res.status(201).send('New category created');
        } catch (e) {
            res.status(400).send('Error while creating category', e);
        }
    }
}

export function editCategory(req, res) {
    // check if category exist, if so, edit it
    const row = database.prepare(`SELECT *
                                  FROM categories
                                  WHERE categorie = ?;`).get(req.params.category);
    if (row) {
        try {
            database.prepare(`UPDATE categories
                              SET category = ?
                              WHERE category = ?`).run(
                req.body.category,
                req.params.category
            );
            res.status(200).send('Category has been edited');
        } catch (e) {
            res.status(400).send(`Error while editing category`, e);
        }
    }
    res.status(404).send('Category not found');
}

export function deleteCategory(req, res) {
    // check if category exist, if so remove it
    const row = database.prepare(`SELECT *
                                  FROM categories
                                  WHERE category = ?;`).get(req.params.category);
    if (row) {
        database.prepare(`DELETE
                          FROM categories
                          WHERE category = ?;`).run(req.params.category);
        res.status(204).send('Category has been deleted');
    } else {
        res.status(404).send('Category not found');
    }
}
