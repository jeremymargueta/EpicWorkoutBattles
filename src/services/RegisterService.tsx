import axios from 'axios';

interface RegisterFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const registerUser = async (data: RegisterFormData) => {
  const response = await axios.post('http://localhost:5000/api/register', data);
  return response.data; // Assuming backend returns JSON
};