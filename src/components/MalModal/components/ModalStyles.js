import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.8)",
  },
  StatusView: { flex: 1, justifyContent: "center", alignItems: "center" },
  StatusItem: {
    width: 110,
    height: 50,
    margin: 5,
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
    paddingHorizontal: 10,
  },
});
