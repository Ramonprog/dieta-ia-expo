import { Text, View, Image, StyleSheet, Pressable } from "react-native";

export default function Index() {

  return (
    <View>
      <Image
        source={require('../assets/images/logo.png')}
      />

      <Text>Dieta.AI</Text>
      <Text>Sua dieta personalizada com inteligência artificial</Text>
      <Pressable>
        <Text>Gerar dieta</Text>
      </Pressable>
    </View >
  );
}