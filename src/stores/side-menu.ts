import { defineStore } from 'pinia';

interface IState {
    toggle: boolean;
}

export const sideMenuStore = defineStore('menu', {
    state: (): IState => ({
        toggle: false,
    }),
    actions: {
        async toogleFunction() {
            this.toggle = !this.toggle;
        },
    },
});
