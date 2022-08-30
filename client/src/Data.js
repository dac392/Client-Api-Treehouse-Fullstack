import config from "./config";


const options = {
    method,
    headers: {
        'Content-Type': 'application/json; charset=utf8'
    }
};

export default class Data {

    /**
     * communicates with the api with the parameters given.
     * @param {String} path - route for your request
     * @param {String} method - request type
     * @param {JSON} body - request body
     * @param {boolean} requiresAuth - does the request require authentications?
     * @param {JSON} credentials - credentials of your request
     * @returns 
     */
    api(path, method='GET', body=null, requiresAuth=false, credentials=null){
        const url = config.apiURL + path;
        if( body !== null){
            options.body = JSON.stringify(body);
        }

        // Check if auth is required
        if(requiresAuth){
            // check this, I'm not too sure about this
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorizations'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    /**
     * Gets the user specified
     * @param {String} username - username
     * @param {String} password - password
     */
    async getUser(username, password){

    }

    /**
     * POST a new user to the db
     * @param {JSON} user - information for your new user
     */
    async createUser(user){

    }


}