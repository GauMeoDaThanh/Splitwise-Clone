import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: '516039420727-55t958ggtuoesfb26gv1gn4gfoippqvs.apps.googleusercontent.com',
    androidClientId: '1081554393645-e9jee40u5192mcva77aehflppjtdo3vj.apps.googleusercontent.com',
    iosClientId: '1081554393645-v38dus4umgiv1qgnku7lu74v38pnmaks.apps.googleusercontent.com'
});

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            await auth().signInWithCredential(googleCredential);

            setLoggedIn(true);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // Người dùng đã huỷ đăng nhập
                console.log('Đăng nhập bị huỷ bỏ');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Một quá trình đăng nhập khác đang diễn ra
                console.log('Một quá trình đăng nhập khác đang diễn ra');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Google Play Services không khả dụng hoặc cài đặt trên thiết bị
                console.log('Google Play Services không khả dụng hoặc cài đặt trên thiết bị');
            } else {
                // Lỗi không xác định
                console.error('Đã xảy ra lỗi:', error.message);
            }
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loggedIn ? (
                <Button title="Đăng xuất" onPress={() => auth().signOut().then(() => setLoggedIn(false))} />
            ) : (
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signInWithGoogle}
                />
            )}
        </View>
    );
};

export default AppGG;
