<template lang="pug">
.todo 
	.todo__description {{task.todo}}
	.delete.btn(@click="deletetask") удалить

</template>
<script>
	// import admin from "./admin.vue"
	import {mapActions,mapGetters,mapMutations} from "vuex"
	import 'jquery'
	export default {
		data(){
			return {

			}
		},
		props: ['task'],
		
		methods: {
			...mapMutations(['newNote_deleteTask']),
			deletetask(){
				this.newNote_deleteTask(this.key)
			}
		}
	}
</script>
<style lang="sass" scoped>
.todo
	display: grid
	grid-gap: 1rem
</style>