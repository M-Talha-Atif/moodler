// store/useDailyCheckInStore.ts
import { create } from "zustand";

interface DailyCheckInState {
  hasDailyCheckIn: boolean | null;   // null = not checked yet
  setHasDailyCheckIn: (val: boolean | null) => void;
}

export const useDailyCheckInStore = create<DailyCheckInState>((set) => ({
  hasDailyCheckIn: null,
  setHasDailyCheckIn: (val) => set({ hasDailyCheckIn: val }),
}));
