export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),
  actions: {
    setIsLoading() {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
      this.loading = true;
    },
    clearLoading() {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      this.loading = false;
    },
  },
});
