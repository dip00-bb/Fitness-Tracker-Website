import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../Firebase/firebase.config';
import { AuthContext } from '../AuthContext/AuthContext';





const AuthProvider = ({ children }) => {



    const provider = new GoogleAuthProvider()
    const [isLoading, setLoading] = useState(true);


    const [user, setUser] = useState(null)


    const googleLogIn = () => {
        return signInWithPopup(auth, provider)
    }

    const userRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name, url) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: url });
    }

    const signout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        };
    }, []);

    const authInformation = {
        user,
        isLoading,
        googleLogIn,
        setUser,
        signout,
        setLoading,
        userRegister,
        userLogIn,
        updateUser

    }

    return <AuthContext value={authInformation}>{children}</AuthContext>
};

export default AuthProvider;