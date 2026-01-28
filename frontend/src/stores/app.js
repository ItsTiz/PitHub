import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        appTheme: 'pithubDarkTheme'
    }),

    actions: {
        setLightTheme(){
            this.appTheme = 'pithubLightTheme';
        },
        setDarkTheme(){
            this.appTheme = 'pithubDarkTheme'
        },
        toggleTheme(){
            this.appTheme === 'pithubDarkTheme' ? this.setLightTheme() : this.setDarkTheme();
        }
    }
})
