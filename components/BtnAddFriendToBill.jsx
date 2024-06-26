import { StyleSheet, Text, Image, TouchableOpacity, Alert } from "react-native";
// Danh sách các bạn bè
const BtnAddFriendToBill = ({
  name,
  avatar,
  onPress,
  isSelected,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.buttonSelected]}
      onPress={!isSelected ? onPress : null}
      onLongPress={isSelected ? onLongPress : null}
    >
      <Image
        source={
          avatar
            ? { uri: avatar }
            : require("../assets/images/avatar_image.jpg")
        }
        style={styles.avatar}
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default BtnAddFriendToBill;
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderColor: "green", // Màu viền
    borderWidth: 1, // Độ dày viền
    borderRadius: 24, // Bo tròn góc
    alignSelf: "flex-start", // Để button có chiều rộng tự động
    marginVertical: 6,
    marginHorizontal: 5,
  },
  buttonSelected: {
    backgroundColor: "#4EEE94", // Màu nền khi nút được chọn
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
