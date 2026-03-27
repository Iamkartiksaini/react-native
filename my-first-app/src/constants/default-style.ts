import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const ICON_SIZE = scale(22)

export const ICON_STYLE = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 50,
        marginBottom: 4,
        justifyContent: "center",
        alignItems: "center",
        height: 36,
        width: 36
    }
})