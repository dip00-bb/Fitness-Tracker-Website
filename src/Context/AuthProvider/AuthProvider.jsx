import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../Firebase/firebase.config';
import { AuthContext } from '../AuthContext/AuthContext';
import axiosPublic from '../../Hooks/useAxiosPublic';





const AuthProvider = ({ children }) => {

    const [userRole, setUserRole] = useState(null)
    const provider = new GoogleAuthProvider()
    const [isLoading, setLoading] = useState(true);

    const [user, setUser] = useState(null)


    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.email) {
                setRoleLoading(true);
                try {
                    const res = await axiosPublic.get(`/user-role/${user.email}`);
                    setUserRole(res.data.role);
                } catch (err) {
                    console.error('Error fetching user role:', err);
                } finally {
                    setRoleLoading(false);
                }
            } else {
                setRoleLoading(false);
            }
        };

        fetchRole();
    }, [user]);





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
        localStorage.removeItem('access-token');
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            setLoading(false)

            if (currentUser?.email) {
                try {
                    const res = await axiosPublic.post('/jwt', {
                        email: currentUser.email,
                    });
                    localStorage.setItem('access-token', res.data.token);
                } catch (err) {
                    console.error('JWT Fetch Error:', err);
                }
            } else {
                localStorage.removeItem('access-token');
            }

        })
        return () => {
            unSubscribe()
        };
    }, []);

    const authInformation = {
        user,
        isLoading,
        roleLoading,
        userRole,
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