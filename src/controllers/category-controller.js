import * as database from ".././databaseHandler/databaseConnector.js";

export async function getAllCategories(req, res) {
    // call to get all categories function
    const categories = await database.getAllCategories();
    return res.status(200).json(categories);
}

export async function getSpecificCategory(req, res) {
    // call to get category on category name function
    const category = await database.getSpecificCategory(req.params.category);
    if (!category) {
        // send error message if there is no article
        return res.status(404).json(`No category found with name ${req.params.category}`);
    } else {
        return res.status(200).json(category);
    }
}

export async function createCategory(req, res) {
    // format body into constant
    const category = req.body;
    // check if category exist
    const checkCat = await database.getSpecificCategory(category);
    if (checkCat) {
        return res.status(403).json(`This category already exist`);
    } else {
        // add category to database
        try {
            await database.createCategory(category);
            return res.status(200).json('Category successfully created');
        } catch (err) {
            return res.status(400).json('Error while creating category', err);
        }
    }
}

export async function editCategory(req, res) {
    const newCategory = req.body;
    // check if category exist
    const category = await database.getSpecificCategory(req.params.category);
    if (!category) {
        return res.status(404).json(`Given category ${category} does not exist`);
    } else {
        // update category
        try {
            await database.updateCategory(newCategory, category);
            return res.status(200).json("Category updated");
        } catch (err) {
            return res.status(400).json('Error with changing category', err);
        }
    }
}

export async function deleteCategory(req, res) {
    // check if category exist
    const category = database.getSpecificCategory(req.params.category);
    if (!category) {
        return res.status(404).json(`Category ${req.params.category} does not exist`);
    } else {
        try {
            await database.deleteCategory(req.params.category);
            return res.status(204).json('Category successfully');
        } catch (err) {
            return res.status(400).json(err);
        }
    }

}
