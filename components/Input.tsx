import { StyleSheet, TextInput, View, KeyboardTypeOptions } from "react-native";
import { Controller } from 'react-hook-form';

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
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
        )}
      />
      {error && <Text style={{ color: colors.red, fontSize: 12, marginTop: 4 }}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
});
