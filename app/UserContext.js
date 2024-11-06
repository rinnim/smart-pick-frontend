"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const authData = window.localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setState(parsedAuthData);
      console.log(state);
      console.log(parsedAuthData);

      // const fetchUser = async () => {
      //   try {
      //     const res = await axios.get(
      //       `${process.env.NEXT_PUBLIC_API_URL}/auth/user/profile`,
      //       { headers: { Authorization: `Bearer ${parsedAuthData.token}` } },
      //     );
      //     if (
      //       parsedAuthData.user !== res.data.user ||
      //       parsedAuthData.token !== res.data.token
      //     ) {
      //       setState({
      //         token: res.data.token,
      //         user: res.data.user,
      //       });
            // window.localStorage.setItem("auth", JSON.stringify(res.data));
      //     }
      //     console.log(state);
      //   } catch (err) {
      //     console.log(err);
      //     // setState({ token: "", user: null });
      //     // window.localStorage.removeItem("auth");
      //     // window.location.href = "/user/login";
      //   }
      // };
      // fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
