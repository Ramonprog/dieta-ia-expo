import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '@/constants/colors';
import { Header } from '@/components/Header';
import { Select } from '@/components/Select';
import { useDataStore } from '@/store/data';

const schema = z.object({
  gender: z.string().min(1, { message: 'Sexo é obrigatório' }),
  objective: z.string().min(1, { message: 'Objetivo é obrigatório' }),
  level: z.string().min(1, { message: 'Nível é obrigatório' }),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const setPageTow = useDataStore(state => state.setPageTwo)

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleCreate(data: FormData) {
    setPageTow(data)
  }

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
        <Text style={styles.label}>Nível de atividade:</Text>
        <Select
          control={control}
          name='level'
          placeholder='Selecione o seu nível'
          error={errors.level?.message}
          options={[
            { label: 'Sedentário (Pouca ou nenhuma atividade física)', value: 'Sedentário' },
            { label: 'Levemente ativo (1 a 3 vezes na semana)', value: 'Levemente ativo exercicio (1 a 3 vezes na semana)' },
            { label: 'Ativo (3 a 5 vezes na semana)', value: 'Ativo (3 a 5 vezes na semana)' },
            { label: 'Muito ativo (5 a 7 vezes na semana)', value: 'Muito ativo (5 a 7 vezes na semana)' },
            { label: 'Extremamente ativo (7 ou mais vezes na semana)', value: 'Extremamente ativo (7 ou mais vezes na semana)' },
          ]}
        />

        <Pressable style={styles.btn} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.btnText}>Continuar</Text>
        </Pressable>
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