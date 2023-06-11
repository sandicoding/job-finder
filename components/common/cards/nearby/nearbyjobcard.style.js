import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  siswaName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  siswaNis: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  siswaStatus: (siswa) => ({
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: siswa?.status === "DITERIMA" ? COLORS.primary : COLORS.red,
    backgroundColor: siswa?.status === "DITERIMA" ? "#D4F5E3" : "#FDEDEC",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: 140,
    marginTop: 3,
    textTransform: "capitalize",
  }),
});

export default styles;
