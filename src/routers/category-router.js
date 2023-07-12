import * as categoryC from '../controllers/category-controller.js';
import express from "express";

const router = express.Router();

// get call to retrieve all categories
router.get('/categories', categoryC.getAllCategories);

// get call to retrieve specific category
router.get('/categories/:category', categoryC.getSpecificCategory);

// post call to create new category
router.post('/categories', categoryC.createCategory);

// put call to edit a category
router.put('/categories/:category', categoryC.editCategory);

// delete call to remove category
router.delete('/categories/:category', categoryC.deleteCategory);

export default router;