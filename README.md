# Những thứ cần cài đặt

## Expo

Để bắt đầu với dự án, bạn cần cài đặt Expo. Expo là một công cụ giúp bạn dễ dàng phát triển ứng dụng React Native mà không cần phải cài đặt Android Studio hay Xcode.

### Cài đặt Expo:

1. Truy cập vào [Expo](https://expo.dev/) và làm theo hướng dẫn cài đặt.
2. Cài đặt Expo CLI thông qua npm:
    ```bash
    npm install -g expo-cli
    ```

### Tham khảo thêm:
- [Expo Documentation](https://docs.expo.dev/)

## FireBase của Google

1. Truy cập vào [FireBase](https://console.firebase.google.com/) và build những thứ cần thiết như Realtime Database, Authentication, ...
2. Tại phần Project OverView hãy Add app, Và chon Web nha làm theo hướng dẫn trong đó, Tới phần Add FireBase SDK người ta sẽ cung cấp 1 đoạn code thì hãy copy phần firebaseConfig và dán vào lib/firebase.tsx
3. Tôi có 1 file data.json mẫu bạn có thể vào và thêm vào Realtime Database.
4. Nếu không thêm được hay gọi được dữ liệu thì có thể bạn chưa chỉnh Rules, bạn hãy để là
   ```
      {
         "rules": {
            ".read": "true",  
            ".write": "true"  
         }
      }
   ```

### Tham Khảo thêm tại:
- [React Native FireBase](https://rnfirebase.io/)
- [Expo FireBase](https://docs.expo.dev/guides/using-firebase/)

## Nếu được cho tôi 1 follow nhó:
- [Facebook](https://www.facebook.com/quangcuong.tran.545)