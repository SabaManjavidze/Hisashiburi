import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.7)",
  },
  StatusView: { flex: 1, justifyContent: "center", alignItems: "center" },
  StatusItem: {
    width: 110,
    height: 50,
    margin: 5,
    // padding: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  ScoreView: { flex: 1 },
  DateView: { flex: 1.5 },
  ProgressView: { flex: 1 },

  ViewLabelText: { color: "white", fontSize: 15 },
  ViewLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    // marginHorizontal: 10,
  },
});
