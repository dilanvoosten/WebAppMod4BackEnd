import * as userC from '../controllers/user-contoller.js';
import express from 'express';

const router = express.Router();
import * as nhf from '../nextHandlerFunctions.js';

// get call to retrieve all users
router.get('/users', userC.getAllUsers);

// get call to retrieve user on username
router.get('/users/:username', userC.getUserOnUsername);

// get call to retrieve current user
router.get('/users/current', userC.getCurrentUser);

// post call to create new user
router.post('/users', nhf.threeParam, userC.createNewUser);

// put call to change a users credentials
router.post('/users/update', nhf.threeParam, userC.updateUserCredentials);

//  delete call to delete a user
router.delete('/delete/user/:username', userC.deleteUser);

// exports
export default router;



