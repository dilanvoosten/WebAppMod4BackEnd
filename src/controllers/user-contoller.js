import * as  database from ".././databaseHandler/databaseConnector.js";
import currentUser from "../index.js";


export async function getAllUsers(req, res) {
    // call the get all users function
    const users = await database.getAllUsers();
    return res.status(200).json(users);
}

export async function getUserOnUsername(req, res) {
    // call the get user on username function
    const user = await database.getUserOnUsername(req.params.username);
    if (!user) {
        // send error message if user does not exist
        return res.status(404).json(`User with this username: ${req.params.username} does not exist`);
    } else {
        return res.status(200).json(user);
    }
}

export async function getCurrentUser(req, res) {
// TODO: get current user in session
    return res.json('current user');
}


export async function createNewUser(req, res) {
    // format body into constants
    const {username, password, role} = req.body;

    // check if user already exists
    const user = await database.getUserOnUsername(username);
    if (user) {
        res.status(403).json(`User with this username already exist!`);
    } else {
        // try to add user to database and redirect to homepage
        try {
            await database.createUser(username, password, role);
            return res.status(200).redirect('/home');
        } catch (e) {
            return res.status(400).json(`Error with creating new user: ${e}`)
        }
    }
}


export async function updateUserCredentials(req, res) {
    // format body into constants
    const {username, password} = req.body;

    // check if the user actually exists
    const user = await database.getUserOnUsername(req.params.username);
    if (!user) {
        return res.status(404).json(`User with this username: ${req.params.username} does not exist`);
    } else {
        // check which credentials to change and do accordingly
        try {
            if (username === undefined) {
                // change password only
                await database.updatePassword(password, req.params.username);
                return res.status(200).json('Password changed!');
            } else if (password === undefined) {
                // change username only
                await database.updateUsername(username, req.params.username);
                return res.status(200).json('Username changed!');
            } else {
                // change both username and password
                await database.updateUsernameAndPassword(username, password, req.params.username);
                return res.status(200).json('Username and Password changed!');
            }
        } catch (err) {
            return res.status(400).json(`Error with changing credentials: ${err}`)
        }
    }
}

export async function deleteUser(req, res) {
    // check if username exist
    const user = await database.getUserOnUsername(req.params.username);
    if (!user) {
        // send error message if user does not exist
        return res.status(404).json(`User with this username: ${req.params.username} does not exist`);
    } else {
        try {
            await database.deleteUser(req.params.username);
            return res.status(204).json('User successfully deleted!');
        } catch (err) {
            return res.status(400).json('Error while deleting user', err);
        }
    }
}



