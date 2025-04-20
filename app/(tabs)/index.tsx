import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';

const index = () => {
    const [user, setUser] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is signed in:', user.uid);
                setUser(true)
            } else {
                console.log('User is signed out');
                setUser(false)
            }
        });
        return unsubscribe;
    }, []);

    const LogOut = async () => {
        try{
            await firebaseSignOut(auth)
            console.log('Đăng xuất thành công')
        }catch(error) {
            console.log('Lỗi đăng xuất', error)
        }
    }

    return (
        <View>
            <Text>index</Text>
            {
                user ? (
                    <TouchableOpacity onPress={LogOut}>
                        <Text>Đăng xuất</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => router.push('/(tabs)/login')}>
                        <Text>Đăng Nhập</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default index

const styles = StyleSheet.create({})