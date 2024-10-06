import { colors } from "@/constants/colors";
import { useDataStore } from "@/store/data";
import { StyleSheet, Text, View } from "react-native";

export default function Nutrition() {

  const userData = useDataStore(state => state.user)
  console.log("🚀 ~ Nutrition ~ userData:", userData)

  return (
    <View>
      <Text>Nutrition</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});