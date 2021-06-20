import axios from 'axios'

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth/";

class AuthService {
    

    login(username, password){
        return axios
        .post(AUTH_API_BASE_URL + "signin", {
            username,
            password
        }).then(response => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout(){
        window.location.href = "/login";
        localStorage.removeItem("user");
        
    }

    register(username, email, password) {
        return axios.post(AUTH_API_BASE_URL + "signup", {
            username,
            password,
            email
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

}

export default new AuthService();