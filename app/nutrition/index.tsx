import { colors } from "@/constants/colors";
import { api } from "@/service/api";
import { useDataStore } from "@/store/data";
import { DataType } from "@/types/data";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View, ActivityIndicator, Pressable, ScrollView, Share } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router";

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
      return data.data
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

  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0) return;

      const suplements = `${data?.suplementos.map(item => `${item}`)}`
      const foods = `${data?.refeicoes.map(item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map(alimento => `${alimento}`)}`)}`
      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica de suplementos:\n${suplements}`

      await Share.share({
        message: message
      })
    } catch (error) {
      console.log("🚀 ~ handleShare ~ error:", error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.titleHeader}>Minha dieta</Text>
          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.objective}>Foco: {data.objetivo}</Text>
            <Text style={styles.label}>Refeições:</Text>

            <ScrollView>
              <View style={styles.foods}>
                {data.refeicoes.map((ref, index) => (
                  <View key={index} style={styles.food}>
                    <View style={styles.foodHeader}>
                      <Text style={styles.foodName}>{ref.nome}</Text>
                      <Ionicons name='restaurant' size={16} color='#000' />
                    </View>

                    <View style={styles.foodContent}>
                      <Ionicons name="time" size={14} color="#000" />
                      <Text> Horário: {ref.horario}</Text>
                    </View>

                    <Text style={styles.foodName}>Alimentos: </Text>
                    {ref.alimentos.map((alimento, index) => (
                      <Text key={index} style={styles.foodText}>{alimento}</Text>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.suplementos}>
                <Text style={styles.foodName}>Dica suplementos: </Text>
                {data.suplementos.map((sup, index) => (
                  <Text key={index}>{sup}</Text>
                ))}
              </View>

              <Pressable style={{ ...styles.buttonShare, alignItems: 'center', marginBottom: 16 }} onPress={() => router.replace('/')}>
                <Text style={styles.buttonShareText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.background,
  },
  buttonShare: {
    backgroundColor: colors.blue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonShareText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold'
  },
  objective: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold'
  },
  foods: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8
  },
  food: {
    backgroundColor: 'rgba(208,208,208,0.40)',
    padding: 8,
    borderRadius: 8,
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  foodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14
  },
  suplementos: {
    backgroundColor: colors.white,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 8,
  }

});
