import * as database from ".././databaseHandler/databaseConnector.js";

// get a message if the server responses
export async function serverCheck(req, res) {
    return res.status(200).json("Server is responding");
}

// check the credentials of the user when trying to log in
export async function checkCredentials(req, res) {
    // format the incoming log in credentials
    const {username, password} = req.body;
    // check if user credentials are valid
    const user = await database.getSpecificUser(username, password);
    if (!user) {
        return res.status(404).json('Incorrect combination of username and password');
    } else {
        // TODO: return user in session
        return res.status(200).json(user);
    }
}