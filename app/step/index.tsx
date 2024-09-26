import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { colors } from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  weight: z.string().min(1, { message: 'Peso é obrigatório' }),
  age: z.string().min(1, { message: 'Idade é obrigatório' }),
  height: z.string().min(1, { message: 'Altura é obrigatório' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Header step='Passo 1' title='Vamos começar' />
      <ScrollView style={styles.constent}>
        <Text style={styles.label}>Nome:</Text>
        <Input name='name' control={control} placeholder='Digite seu nome' error={errors.name?.message} keyboardType='default' />
        {/* <Text style={styles.label}>Peso:</Text>
        <Input name='weight' control={control} placeholder='Digite seu peso' error={errors.weight?.message} keyboardType='numeric' />
        <Text style={styles.label}>Idade:</Text>
        <Input name='age' control={control} placeholder='Digite sua idade' error={errors.age?.message} keyboardType='numeric' />
        <Text style={styles.label}>Altura:</Text>
        <Input name='height' control={control} placeholder='Digite sua altura' error={errors.height?.message} keyboardType='numeric' /> */}


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
});