import { StyleSheet, TextInput, View, KeyboardTypeOptions, Text } from "react-native";
import { Controller } from 'react-hook-form';
import { colors } from "@/constants/colors";

interface InputProps {
  name: string;
  control: any;
  placeholder: string;
  rules?: object;
  error?: string;
  keyboardType: KeyboardTypeOptions;
}

export function Input({ control, keyboardType, name, placeholder, rules, error }: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}

        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  input: {
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  }
});
