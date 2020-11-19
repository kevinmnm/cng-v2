<template>
	<v-col cols="6" class="ma-auto">
		<h1 @click="test()">Welcome Call</h1>
	</v-col>
</template>

<script>
export default {
   name: 'WelcomeCall',
   methods: {
      test() {
         window.socket.emit('customEvent2', {
            some: 'data'
         });
      }
   }
}
</script>

<style>
</style>