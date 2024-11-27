<template>
  <div>
      <h1>API Demo</h1>
      <h1>API Demo</h1>
      <p>App Version: {{ version }}</p>
      <button @click="fetchHello">Get Hello</button>
      <button @click="fetchGreet">Get Greet</button>
      <p v-if="url">Request made to: {{ url }}</p>
      <p v-if="response">Response: {{ response }}</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
      return {
          version: process.env.VUE_APP_VERSION,
          url: '', // To store the URL of the request
          response: '', // To store the response or error message
      };
  },
  methods: {
      async fetchHello() {
          const url = '/hello'; // Endpoint being called
          this.url = url; // Set the URL in the state
          try {
              const res = await api.getHello();
              this.response = res.data; // Set the response
          } catch (err) {
              console.error(err);
              this.response = 'Error fetching Hello'; // Set error message
          }
      },
      async fetchGreet() {
          const url = '/greet'; // Endpoint being called
          this.url = url; // Set the URL in the state
          try {
              const res = await api.getGreet();
              this.response = res.data; // Set the response
          } catch (err) {
              console.error(err);
              this.response = 'Error fetching Greet'; // Set error message
          }
      },
  },
};
</script>
