import api from "../backendUrl/index";

async function LoginInfo() {
  try {
    const response = await fetch(api.isLoggedIn.url, {
      method: api.isLoggedIn.method,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // or some default value
  }
}

export default LoginInfo;