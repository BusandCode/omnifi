import { create } from 'zustand';

export type Profile = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
};

type ProfileStore = Profile & {
  updateProfile: (updates: Partial<Profile>) => void;
};

const initialProfile: Profile = {
  fullName: 'Silver Abdul',
  email: 'silverabdul@email.com',
  phone: '+234 803 123 4567',
  dob: '12 March 1999',
  gender: 'Male',
  address: 'Abuja, FCT, Nigeria',
};

export const useProfileStore = create<ProfileStore>((set) => ({
  ...initialProfile,
  updateProfile: (updates) => set((state) => ({ ...state, ...updates })),
}));