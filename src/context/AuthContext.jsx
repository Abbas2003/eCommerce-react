import { Spinner } from "@nextui-org/react";
import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { em } from "framer-motion/client";


export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        isLogin: false,
        userInfo: {}
    })

    // Handle user state changes
    function onAuthChanged(user) {
        if (user) {
            // console.log("user=>", user)
            setUser({
                isLogin: true,
                userInfo: {
                    name: user?.displayName,
                    email: user?.email,
                    photoUrl: user?.photoURL,
                }
            });
        } else {
            setUser({ isLogin: false, userInfo: {} });
        }
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {
                loading ? (
                    <div className="w-full h-96 flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    children
                )
            }
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;