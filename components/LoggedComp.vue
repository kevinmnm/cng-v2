<template>
	<v-col cols="12">
      <v-btn @click="logout()">Logout</v-btn>
   </v-col>
</template>

<script>
export default {
   name: 'LoggedComp',
   methods: {
      logout(){
         localStorage.token = null;
         this.$store.dispatch('logged/fetchLogged', false);
      }
   }
}
</script>

