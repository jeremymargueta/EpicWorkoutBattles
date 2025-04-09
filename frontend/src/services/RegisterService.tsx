interface RegisterFormData {
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const registerUser = async (data: RegisterFormData) => {
  const response = await fetch("http://localhost:5555/api/register");
  // return response.data; // Assuming backend returns JSON
};
