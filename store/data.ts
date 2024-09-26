import {create} from 'zustand'

export type UserData = {
  name: string;
  weight: string;
  height: string;
  age: string;
  level: string;
  objective: string;
  gender: string;
}

type DataState = {
  user: UserData;
  setPageOne: (data: Omit<UserData, 'gender' | 'level' | 'objective'>) => void;
  setPageTwo: (data: Pick<UserData, 'gender' | 'level' | 'objective'>) => void;
}

export const useDataStore = create<DataState>((set) =>({
  user: {
    name: '',
    weight: '',
    height: '',
    age: '',
    level: '',
    objective: '',
    gender: '',
  },
  setPageOne: (data) => set((state) => ({
     user: {
    ...state.user,
    ...data,
  }})),
  setPageTwo: (data) => set((state) => ({
    user: {
      ...state.user,
      ...data,
    },
  })),
}))