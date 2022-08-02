import { StyleSheet } from "react-native";
import { Colors } from "@constants";

export default styles = StyleSheet.create({
  backIcon: { height: 24, width: 24 },
  supportText: { height: 24, width: 24 },
  mainWrapper: { flex: 1, marginTop: 16 },
  supportTextWrapper: { flexDirection: "row", alignItems: "center" },
  commonIconDesign: { height: 18, width: 18, marginLeft: 18 },
  arrowRightWrapper: { alignSelf: "center", flex: 1, right: 25 },
  arrowRight: { height: 24, width: 24, alignSelf: "flex-end" },
  line: { height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16, marginTop: 16, },
  fontWeight400: { fontWeight: "400" },
  fontWeight500: { fontWeight: "500" },
  marginTop: { marginTop: 16 },
  flex1: { flex: 1, backgroundColor: Colors.white },
  top: { top: -2 },
});
