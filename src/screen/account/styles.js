import { StyleSheet } from "react-native";
import { Colors } from "@constants";

export default styles = StyleSheet.create({
  defaultUser: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primary50,
    borderRadius: 100,
    position: "absolute",
    left: 55,
    top: 55,
  },
  userIcon: {
    width: 40,
    height: 40,
    tintColor: Colors.primary600,
  },
  selectPicView: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 100,
    position: "absolute",
    left: 70,
    top: 70,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cameraIcon: {
    width: 16,
    height: 16,
    tintColor: "#ff4048",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Colors.white,
  },
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: Colors.white,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: "#E4E7EC",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  sampleStyle: {
    textDecorationLine: "underline",
  },
  featureIcon: {
    height: 20,
    width: 20,
    marginRight: 16,
  },
  chevron_rightIcon: {
    height: 24,
    width: 24,
  },
  iconModal: {
    width: 20,
    height: 20,
    marginRight: 16,
    tintColor: "black",
  },
  logoutIcon: {
    alignSelf: "center",
    height: 60,
    width: 60,
    marginTop: 20,
  },
  fontWeight: { fontWeight: "400%" },
  cancleButton: {
    backgroundColor: "white",
    borderColor: Colors.gray300,
    borderWidth: 1,
    marginBottom: 16
  },
});
