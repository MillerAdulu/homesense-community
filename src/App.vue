<template>
  <v-app>
    <v-container>
      <v-card>
    <v-card-title>Realtime Threats
      <v-spacer></v-spacer>
      <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line hide-details/>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="intrusions"
      :loading="false"
      :search="search"
      class="elevation-1"
    >
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td>{{ props.item.parsed.area }}</td>
        <td>{{ props.item.parsed.notes}}</td>
      </template>
    </v-data-table>
  </v-card>
    </v-container>
  </v-app>
</template>

<script>
import messaging from './utils/firebase'
import store from './store'

messaging.usePublicVapidKey(
  'BNmUrTpYFrIvfzNAUy7EM_c5GVNwL8L2bVV4nfvoBRjUDvnKev6VU3w7VJSlbKXJQ1Mgmuajsvxf1PV-BiFpm3U'
)
messaging
  .requestPermission()
  .then(() => {
    console.log('Notification permissions granted')
  })
  .catch((error) => {
    console.log('Unable to get permissions to notify.', error)
  })
messaging.getToken()
  .then((token) => {
    console.log(`Token is: ${token}`)
  }).catch((error) => {
    console.log('Error', error)
  })

messaging.onMessage((payload) => {
  store.state.intrusions.push(payload.data)
})
export default {
  name: 'Community Board',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Homesense ID', align: 'left', value: 'id' },
        { text: 'Area', value: 'parsed.area' },
        { text: 'Notes', value: 'parsed.notes' }
      ]
    }
  },
  computed: {
    intrusions () {
      return this.$store.getters.intrusions
    }
  }
}
</script>
