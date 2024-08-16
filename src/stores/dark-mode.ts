import { defineStore } from 'pinia';

interface IState {
    isDarkMode: boolean;
}

export const darkModeStore = defineStore('darkMode', {
    state: (): IState => ({
        isDarkMode: false,
    }),
    actions: {
        async toogleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
        },
    },
});
