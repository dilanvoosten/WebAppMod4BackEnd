import * as categoryC from '../controllers/category-controller.js';
import express from "express";

const router = express.Router();
import * as nhf from '../nextHandlerFunctions.js'

// get call to retrieve all categories
router.get('/categories', categoryC.getAllCategories);

// post call to create new category
router.post('/categories', nhf.oneParam, categoryC.createCategory);

// put call to edit a category
router.put('/categories/:category', nhf.oneParam, categoryC.editCategory);

// delete call to remove category
router.delete('/categories/:category', categoryC.deleteCategory);

export default router;