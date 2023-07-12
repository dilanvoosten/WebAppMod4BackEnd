import * as indexC from '../controllers/index-controller.js';
import express from "express";

const router = express.Router();

// get call to check the server
router.get('/', indexC.serverCheck);

// post call to check credentials of user
router.post('/', indexC.checkCredentials);

export default router;