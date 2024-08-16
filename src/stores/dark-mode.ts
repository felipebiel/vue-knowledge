import { defineStore } from 'pinia';

interface IState {
    isDarkMode: boolean;
}

export const darkModeStore = defineStore('darkMode', {
    state: (): IState => ({
        isDarkMode: localStorage.getItem('darkmode') ? localStorage.getItem('darkmode') === 'true' : false,
    }),
    actions: {
        async toogleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('darkmode', this.isDarkMode.toString());
        },
    },
});
