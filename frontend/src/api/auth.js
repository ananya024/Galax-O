// auth.js

import api from "./axios";

export const loginUser= (formData)=> api.post("auth/login", formData);
export const registerUser = (formData)=> api.post("users", formData);