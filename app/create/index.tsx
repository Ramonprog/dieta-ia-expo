import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { Select } from '@/components/Select';

const schema = z.object({
  gender: z.string().min(1, { message: 'Sexo é obrigatório' }),
  objective: z.string().min(1, { message: 'Objetivo é obrigatório' }),
  level: z.string().min(1, { message: 'Nível é obrigatório' }),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Header step='Passo 2' title='Finalizando dieta' />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name='gender'
          placeholder='Selecione o seu sexo'
          error={errors.gender?.message}
          options={[{ label: 'Masculino', value: 'masculino' }, { label: 'Feminino', value: 'feminino' }]}
        />

        <Text style={styles.label}>Objetivo:</Text>
        <Select
          control={control}
          name='objective'
          placeholder='Selecione o seu objetivo'
          error={errors.objective?.message}
          options={[{ label: 'Perder peso', value: 'perder peso' }, { label: 'ganhar peso', value: 'ganhar peso' }, { label: 'Manter peso', value: 'manter peso' }]}
        />
        <Text style={styles.label}>Nível:</Text>
        <Select
          control={control}
          name='level'
          placeholder='Selecione o seu nível'
          error={errors.level?.message}
          options={[{ label: 'Iniciante', value: 'Iniciante' }, { label: 'Intermediário', value: 'Intermediário' }, { label: 'Avançado', value: 'Avançado' }]}
        />
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.white,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});