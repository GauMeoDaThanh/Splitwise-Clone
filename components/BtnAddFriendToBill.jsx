import { StyleSheet, Text, Image, TouchableOpacity, Alert } from "react-native";
// Danh sách các bạn bè
const friendsList = [
  { name: "Tấn Dũng", avatar: require("../assets/icons/account.png") },
  { name: "John Doe", avatar: require("../assets/icons/account.png") },
  {
      name: "Nguyễn Đoàn Bảo Châu",
      avatar: require("../assets/icons/account.png"),
  },
];
const BtnAddFriendToBill = ({ name, avatar, onPress, isSelected  }) => {
  const handleLongPress = (friend) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to remove this person from the bill sharing list?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Xử lý khi người dùng nhấn "Đồng ý"
            // Ví dụ: Xóa bạn bè khỏi danh sách
            // const newFriendsList = friendsList.filter(item => item.name !== friend.name);
            // Cập nhật danh sách bạn bè
            // setFriendsList(newFriendsList); // Nếu bạn sử dụng state để lưu danh sách bạn bè
            console.log({name} + " đã được xóa");
          }
        }
      ]
    );
  };
  return (
    <TouchableOpacity  style={[styles.button, isSelected && styles.buttonSelected]} onPress={onPress} onLongPress={handleLongPress}>
      <Image
        source={avatar}
        style={styles.avatar}
      />
      <Text style={styles.text}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default BtnAddFriendToBill;
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderColor: 'green',    // Màu viền
    borderWidth: 1,          // Độ dày viền
    borderRadius: 24,        // Bo tròn góc
    alignSelf: 'flex-start', // Để button có chiều rộng tự động
    marginVertical: 6,
    marginHorizontal: 5,
  },
  buttonSelected: {
    backgroundColor: '#4EEE94',  // Màu nền khi nút được chọn
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
    // backgroundColor: "yellow",
  },
  text: {
    marginStart: 10,
  },
});
