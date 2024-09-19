import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({ step, title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable>
            <Feather name="arrow-left" size={24} color={colors.black} />
          </Pressable>
          <Text style={styles.text}>{step} <Feather name="loader" size={16} color={colors.black} /></Text>
        </View>

        <Text style={styles.title}>{title}</Text>

      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    marginBottom: 14,
    paddingTop: 40,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

});