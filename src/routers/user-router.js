import * as userC from '../controllers/user-contoller.js';
import express from 'express';

const router = express.Router();

// get call to retrieve all users
router.get('/users', userC.getAllUsers);

// get call to retrieve user on username
router.get('/users/:username', userC.getUserOnUsername);

// post call to create new user
router.post('/users', userC.createNewUser);

// put call to change a users credentials
router.put('/users/:username', userC.updateUserCredentials);

//  delete call to delete a user
router.delete('users/:username', userC.deleteUser);

// exports
export default router;



