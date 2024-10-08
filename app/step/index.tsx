import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { colors } from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router';
import { useDataStore } from '@/store/data';

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  weight: z.string().min(1, { message: 'Peso é obrigatório' }),
  age: z.string().min(1, { message: 'Idade é obrigatório' }),
  height: z.string().min(1, { message: 'Altura é obrigatório' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

  const setPageOne = useDataStore(state => state.setPageOne);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleCreate(data: FormData) {
    setPageOne(data)
    router.push('/create')
  }

  return (
    <View style={styles.container}>
      <Header step='Passo 1' title='Vamos começar' />
      <ScrollView style={styles.constent}>
        <Text style={styles.label}>Nome:</Text>
        <Input name='name' control={control} placeholder='Digite seu nome' error={errors.name?.message} keyboardType='default' />
        <Text style={styles.label}>Peso:</Text>
        <Input name='weight' control={control} placeholder='Digite seu peso' error={errors.weight?.message} keyboardType='numeric' />
        <Text style={styles.label}>Altura:</Text>
        <Input name='height' control={control} placeholder='Digite sua altura' error={errors.height?.message} keyboardType='numeric' />
        <Text style={styles.label}>Idade:</Text>
        <Input name='age' control={control} placeholder='Digite sua idade' error={errors.age?.message} keyboardType='numeric' />

        <Pressable style={styles.btn} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.btnText}>Continuar</Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  constent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.white,
  },
  btn: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});