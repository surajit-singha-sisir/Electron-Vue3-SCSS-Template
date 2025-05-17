// src/composables/electronStore.ts
export const useElectronStore = () => {
  const set = (key: string, value: any) => {
    return window.electronAPI.store.set(key, value);
  };

  const get = async (key: string) => {
    return await window.electronAPI.store.get(key);
  };

  return { set, get };
};
