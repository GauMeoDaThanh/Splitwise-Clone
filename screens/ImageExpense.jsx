import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ExpenseImage = ({ expenseInfo, onPress }) => {
  return (
   <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={
          expenseInfo.imgUrl
            ? { uri: expenseInfo.imgUrl }
            : require("../assets/default_image.png")
        }
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: 'hidden',
    margin: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain", 
  },
});

export default ExpenseImage;
