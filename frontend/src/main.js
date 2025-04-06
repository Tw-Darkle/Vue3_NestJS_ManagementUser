import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

registerPlugins(app)

createApp(App).use(vuetify).mount('#app')
