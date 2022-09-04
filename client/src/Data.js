import config from "./config";
import { Buffer } from "buffer";

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
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        };
        if( body !== null){
            options.body = JSON.stringify(body);
        }

        // Check if auth is required
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    
        }

        return fetch(url, options);
    }

    /**
     * Gets the user specified
     * @param {String} username - username
     * @param {String} password - password
     */
    async getUser(username, password){
        const response = await this.api('/users', 'GET', null, true, {username, password});
        if (response.status === 200){
            const something = await response.json().then(data=>data);
            return something;

        } else if( response.status === 401 ){
            console.log(response.json());
            return null;
        } else{
            throw new Error();
        }
    }

    /**
     * POST a new user to the db
     * @param {JSON} user - information for your new user
     */
    async createUser(user){

    }

    async getCourses(){
        const response = await this.api('/courses', 'GET');
        if (response.status === 200){
            const something = await response.json().then(data=>data);
            return something;

        } else if( response.status === 401 ){
            console.log(response.json());
            return null;
        } else{
            throw new Error();
        }
    }

    async createCourse(obj, user){
        const response = await this.api('/courses', 'POST', obj, true, {username: user.emailAddress, password: user.password});
        if(response.status === 201){
            return 201;
        } else if( response.status >= 400 ){
            response.json().then(data => {
                console.log(data);
            });
            return null;
        } else{
            throw new Error("something happened");
        }
    }

    async getAllUsers(){
        const response = await this.api('/users-all', 'GET');

        if (response.status === 200){
            const something = await response.json();
            return something;

        } else if( response.status === 401 ){
            console.log(response.json());
            return null;
        } else{
            throw new Error();
        }
    }


}