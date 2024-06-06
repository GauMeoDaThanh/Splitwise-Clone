import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
const AddToolBar = (props) => {
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: "#EEEEEE", borderBottomWidth: 1 },
      ]}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text style={{ color: "#009966", fontWeight: "500", fontSize: 16 }}>
          Cancel
        </Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: "500", fontSize: 16 }}>{props.title}</Text>
      <TouchableOpacity onPress={!props.isDisabled?props.onPress:null}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            color: props.isDisabled ? "#999999" : "#009966",
          }}
        >
          {props.action}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddToolBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
  },
});