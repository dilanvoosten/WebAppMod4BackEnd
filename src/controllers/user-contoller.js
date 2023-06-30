import database from "../connectors/databaseConnector.js";
import currentUser from "../index.js";


export function getAllUsers(req, res) {
    res.status(200).json(database.prepare('SELECT * FROM users;').all());
}

export function getUserOnUsername(req, res) {
    const row = database.prepare(`SELECT *
                                  FROM users
                                  WHERE username = ?;`).get(req.params.username);
    if (row) {
        res.status(200).json(row);
    } else {
        res.status(404).send(`User with this username: ${req.params.username} does not exist`);
    }
}

export function getCurrentUser(req, res) {
    res.status(200).json(currentUser);
}


export function createNewUser(req, res) {
    // check if user already exists, if not create new one
    const userRow = database.prepare(`SELECT *
                                      FROM users
                                      WHERE username = ?`).get(req.body.username);
    if (!userRow) {
        try {
            database.prepare(`INSERT INTO users (username, password, role)
                              VALUES (?, ?, ?);`).run(
                req.body.username,
                req.body.password,
                req.body.role
            );
            res.status(201).redirect('/home');
        } catch (e) {
            res.send(`Error with creating new user: ${e}`);
        }
    } else {
        res.status(401).send(`User with this username already exists!`);
    }
}


export function updateUserCredentials(req, res) {
    // check for maybe not send anything
    if (req.body.updateUsername !== "" || req.body.confirmPassword !== "") {
        // update the username if different username is given
        if (req.body.updateUsername !== "") {

            const usernameRow = database.prepare(`UPDATE users
                                                  SET username = ?
                                                  WHERE username = ?;`).run(
                req.body.updateUsername,
                currentUser.username);
            // check if user is in the system
            if (usernameRow) {
                res.status(200).send('Username updated!');
            } else {
                res.status(404).send(`Username not found in the system!`);
            }
        }
        // update the password if new password is given
        if (req.body.confirmPassword !== "") {
            database.prepare(`UPDATE users
                              SET password = ?
                              WHERE username = ?;`).run(req.body.updateUsername,
                currentUser.username);
            res.status(200).send(`Password updated!`);
        }
    } else {
        res.status(400).send("No updates for username or password were given!");
    }
}

export function deleteUser(req, res) {
    const row = database.prepare(`SELECT *
                                  FROM users
                                  WHERE username = ?`).get(req.params.username);
    // check if user is in the system
    if (row) {
        try {
            database.prepare(`DELETE
                              FROM users
                              WHERE username = ${req.params.username};`).run();
            res.status(204).send('User has been deleted');
        } catch (e) {
            res.send(`Error with deleting user: ${e}`);
        }
    } else {
        res.status(404).send('The user you want to delete is not found');
    }
}


// TODO: Place them to corresponding entity

