// RootLayout.js
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { UserProvider } from "./UserContext"; // Adjust the import based on your folder structure

const RootLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/auth/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, []);

  return <UserProvider value={{ user }}>{children}</UserProvider>;
};

export default RootLayout;
