<template lang="pug">
.main.colored
	.note-list
		.note-link(v-for="(note,index) in getNotes"  :key="index")
			router-link(:to="'/notes/' + index")
				note(:i="index")
			.delete.btn(@click="toBeDeleted=index;showPopup=true") удалить
	.pop-up(v-show="showPopup")
		.pop-up__container удалить?
			.pop-up__body
				.btn.delete(@click="deleteNote(toBeDeleted);$root.$emit('deleted');showPopup=false") да
				.btn(@click="showPopup=false") отмена

	
		

</template>
<script>
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import note from './note.vue'
	export default {
		data(){
			return {
				toBeDeleted: null,
				notes: null,
				showPopup: false
			}
		},
		components: {
			note
		},
		computed:{
			...mapGetters(['getNotes'])
		},
		methods: {
			...mapMutations(['deleteNote']),
			
		},
		created(){
			this.notes = this.getNotes
			
		}
	}
</script>
<style lang="sass">
.main
	position: relative
.pop-up
	position: fixed
	top: 0
	left: 0
	background: rgba(0,0,0,0.5)
	width: 100vw
	height: 100vh
	display: flex
	justify-content: center
	align-items: center
	.pop-up__container
		width: 300px
		height: 150px
		background: white
		display: flex
		justify-content: center
		border-radius: 0.5rem
		flex-wrap: wrap
		.pop-up__body
			display: flex
			flex-direction: column
			width: 100%
			padding: 10px
			.btn
				margin-top: 0.5rem

.note-list
	display: flex
	justify-content: flex-start
	flex-wrap: wrap
	align-items: start
	.note-link
		margin-left: 1rem
		margin-top: 1rem
		display: grid
		grid-gap: 1rem
</style>