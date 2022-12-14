import config from "./config";

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
            const user = await response.json().then(data=>data);
            return { user, errors: null};

        } else if( response.status === 401 ){
            // accessed denied (authorization failed)
            const errors = ['Access denied: username or password may be incorrect'];
            return { user: null, errors };
        } else{
            throw new Error();
        }
    }

    /**
     * POST a new user to the db
     * @param {JSON} user - information for your new user
     */
    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201){
            // console.log("Sign up successful");
            return { status: response.status, errors: null};
        } else {
            const errors = response.json().then(res=>res.errors)
            return { status: response.status, errors};
        }
    }

    /**
     * Get the list of all courses to be displayed in home page
     * @returns list of Courses
     */
    async getCourses(){
        const response = await this.api('/courses', 'GET');
        if (response.status === 200){
            const something = await response.json().then(data=>data);
            return something;

        } else if( response.status === 401 ){
            // console.log(response.json());
            return null;
        } else{
            throw new Error();
        }
    }

    /**
     * Gets the data for a course given the course id
     * @param {int} id id of the course being requested 
     * @returns Course information
     */
    async getCourseById(id){
        const response = await this.api(`/courses/${id}`, 'GET');
        if(response.status === 200){
            const something = await response.json().then(data=>data);
            return something;
        }else if( response.status === 404 ){
            return null;
        } else{
            throw new Error();
        }
    }

    /**
     * POST a new course
     * @param {JSON} obj 
     * @param {JSON} user 
     * @returns {status, errors}
     */
    async createCourse(obj, user){
        // console.log(user);
        const response = await this.api('/courses', 'POST', obj, true, user);
        if(response.status === 201){
            return {status: response.status, errors:null};
        } else if( response.status >= 400 ){
            let errors = await response.json().then(data => data.errors);
            if(errors === null){
                errors = ['Something went wrong'];
            }
            return { status: response.status, errors };
        } else{
            throw new Error("something happened");
        }
    }

    /**
     * Updates the information to a given course.
     * @param {int} id course id
     * @param {JSON} course new course information
     * @param {JSON} user user requesting the PUT
     * @returns {status, errors}
     */
    async updateCourse(id, course, user){
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, user);
        if(response.status === 204){
            return {status: response.status, errors:null};
        }else{
            const errors = await response.json().then(res=>res.errors);
            return {status: response.status, errors:errors};
        }
    }

    /**
     * sends a DELETE request for a course
     * @param {int} id course id
     * @param {JSON} user user information
     * @returns [] or null
     */
    async deleteCourse(id, user){
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, user);
        if(response.status === 204){
            return [];
        }else{
            return null;
        }
    }

    /**
     * Convinience functions used for debugging purposes
     * @returns [] of all users
     */
    async getAllUsers(){
        const response = await this.api('/users-all', 'GET');

        if (response.status === 200){
            const something = await response.json();
            return something;

        } else if( response.status === 401 ){
            // console.log(response.json());
            return null;
        } else{
            throw new Error();
        }
    }


}