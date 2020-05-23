<template lang="pug">
.main.colored
	.note-list
		note(v-for="(note,index) in getNotes" :note="note" :index="index" :key="index")
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import note from './note.vue'
	export default {
		data(){
			return {
				notes: null
			}
		},
		components: {
			note
		},
		computed:{
			...mapGetters(['getNotes'])
		},
		methods: {
			
		},
		created(){
			this.notes = this.getNotes
			this.$on('new-note-created',()=>{
			this.notes=this.getNotes
			})
		}
	}
</script>
<style lang="sass">
.note-list
	display: flex
	justify-content: flex-start
	flex-wrap: wrap
	align-items: start
</style>