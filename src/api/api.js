import axios from "axios";

export const baseURL= 'http://localhost:5000/';

export default {
    registerUser: function (userData) {
        console.log(userData)
        return axios.post(`${baseURL}authentication/register`, userData);
    },
    loginUser: function (userData) {
        return axios.post(`${baseURL}authentication/login`, userData);
    },
    fetchContacts: function () {
        
        return axios.get(`${baseURL}contacts/getContacts`, userData);
    },
    addNewContact: function (contact) {
        return axios.post(`${baseURL}contacts/postContact`, contact);
    },
    removeContact: function(contactId){
        return axios.delete(`${baseURL}contacts/postContact`, contactId);
    }

    }
