import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { router } from 'expo-router';
import { get, ref } from 'firebase/database';

interface data {
    id: string,
    [key: string]: any
}

const index = () => {
    const [user, setUser] = useState(false)
    const [data, setData] = useState<any[]>([])

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

    const fetchData = async () => {
        try {
            const snapshot = await get(ref(db, 'users/'))
            if (snapshot.exists()) {
                const data = snapshot.val()
    
                const usersArray = Object.entries(data).map(
                    ([id, value]: [string, any]) => ({
                        id,
                        ...value
                    })
                )
    
                console.log('Gọi dữ liệu thành công!')
                setData(usersArray)
            } else {
                console.log('Không có dữ liệu trong Firebase')
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error)
        }
    }
    

    const renderItem = ({ item } : {item: data}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>ID: {item.id}</Text>
          {Object.entries(item).map(([key, value]) => {
            if (key !== 'id') {
              return (
                <Text key={key} style={styles.itemText}>
                  {key}: {JSON.stringify(value)}
                </Text>
              );
            }
            return null;
          })}
        </View>
    );

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

            <TouchableOpacity onPress={fetchData}>
                <Text>Gọi SQL</Text>
            </TouchableOpacity>

            {
                data ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        style={styles.list}
                    />
                ) : (
                    <></>
                )
            }

        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#4285f4',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555',
    },
    list: {
        marginTop: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#777',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});