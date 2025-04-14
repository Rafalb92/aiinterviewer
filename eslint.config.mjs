// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@stylistic/brace-style': 'off',
    'nuxt/nuxt-config-keys-order': 'off',
    '@stylistic/quotes': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    '@stylistic/arrow-parens': 'off',
    'vue/operator-linebreak': 'off'
  }
})
// Your custom configs here
