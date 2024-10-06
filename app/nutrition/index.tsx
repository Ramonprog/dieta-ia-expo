import { colors } from "@/constants/colors";
import { api } from "@/service/api";
import { useDataStore } from "@/store/data";
import { DataType } from "@/types/data";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

interface responseData {
  data: DataType;
}

export default function Nutrition() {
  const userData = useDataStore(state => state.user);

  async function getNutrition() {

    if (!userData) {
      throw new Error("Failed to load nutrition");
    }

    const payload = {
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      height: userData.height,
      weight: userData.weight,
      objective: userData.objective,
      level: userData.level,
    };

    try {
      const { data } = await api.post<responseData>("/nutrition", payload);
      console.log("🚀 ~ getNutrition ~ data:", data.data);
      return data;
    } catch (error) {
      console.log("🚀 ~ getNutrition ~ error:", error);
      throw error;
    }
  }

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: getNutrition,
    enabled: !!userData,
  });

  if (isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <Text style={{ color: 'white' }}>Erro ao carregar dados</Text>
        <Text style={{ color: 'white' }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Nutrition Data:</Text>
      <Text style={{ color: 'white' }}>{JSON.stringify(data?.data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
