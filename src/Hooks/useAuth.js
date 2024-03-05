import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if (User) {
        setUser(User);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return { user };
}
