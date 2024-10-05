import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { Controller } from 'react-hook-form';
import { colors } from "@/constants/colors";
import { Feather } from '@expo/vector-icons'
import { useState } from "react";

interface OptionsProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  control: any;
  placeholder: string;
  error?: string;
  options: OptionsProps[];
}

export function Select({ control, name, placeholder, error, options }: SelectProps) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity style={styles.select} onPress={() => setIsOpen(true)}>
              <Text>Selecione ...</Text>
              <Feather name='chevron-down' size={16} color={colors.black} />
            </TouchableOpacity>

            <Modal
              visible={isOpen}
              animationType="fade"
              onRequestClose={() => setIsOpen(false)}
              transparent={true}
            >
              <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setIsOpen(false)}>
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.option} activeOpacity={1} onPress={() => onChange(item.value)}>
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                </TouchableOpacity>

              </TouchableOpacity>
            </Modal>
          </>
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
  },
  select: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 20,
  },
  option: {
    paddingVertical: 14,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});
