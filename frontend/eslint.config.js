import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVueAccessibility from 'eslint-plugin-vuejs-accessibility'
import vueParser from 'vue-eslint-parser'

export default [
    {
        ignores: ['dist/**', 'node_modules/**', '.config/**'],
    },
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    ...pluginVueAccessibility.configs['flat/recommended'],

    {
        files: ['**/*.vue', '**/*.js'], // Apply to both
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            // General JS indentation
            'indent': ['error', 4],
            
            // Vue Template indentation
            'vue/html-indent': ['error', 4],
            
            // Vue Script indentation
            'vue/script-indent': ['error', 4, { 
                baseIndent: 1,
                switchCase: 1 
            }],

            'vue/multi-word-component-names': 'off',
            
            // Accessibility
            'vuejs-accessibility/alt-text': 'error',
            'vuejs-accessibility/label-has-for': 'error',
            'vue/no-v-html': 'off',
            'vuejs-accessibility/form-control-has-label': ['error', {
                controlComponents: ['VTextField', 'VSelect']
            }]
        }
    },
    {
        // Turn off base indent for .vue files to prevent conflicts with vue/script-indent
        files: ['**/*.vue'],
        rules: {
            'indent': 'off'
        }
    }
]