<template lang="pug">
.note.block
	.note__content
		.note__header {{thisNote.name}}
			input(v-show="redacting" name="name" v-model:value="thisNote.name")
			.delete.delete__name.btn(v-show="redacting" @click="thisNote.name=''") очистить
		.todo__list
			todo(@deletetask="deleteTask($event)" v-for="(todo,index) in thisNote.toDos" :redacting="redacting" :todo="todo" :index="index" :key="index")
			.newTodo(v-show="redacting")
				.newTodo__text {{newTodo.todo}}
				input(v-model="newTodo.todo")
				.btn.newTodo__add(@click="addNewTodo") добавить задачу
	.note__options
		.redact.btn(@click="redact") редактировать
		.show_opt(v-show="redacting")
			.save.btn(@click="save") сохранить 
			.reverseChanges
				.cancel.btn(@click="cancel") отменить
				.returnChanges.btn(@click="returnChanges") вернуть изменение
			.delete.delete__note.btn(@click="noteDelete(index)") удалить заметку
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import todo from './todo.vue'
	export default {
		name: 'note',
		data(){
			return {
				newTodo: {checked: false, todo: ''},
				redacting: false,
				thisNote: null
			}
		},
		components: {
			todo
		},
		computed:{
			...mapGetters(['getNotes','isSaved']),
		},
		props: ['note','index'],
		methods: {
			...mapMutations(['noteChanges','deleteNote']),
			noteDelete(i){
				this.deleteNote(i)
				this.$el.style.display = "none"
				this.$root.$emit('deleted')
				console.log(JSON.stringify(this.getNotes,null,2))

			},
			redact(){
				this.redacting=!this.redacting
			},
			deleteTask(e){
				this.thisNote.toDos.splice(e,1)
			},
			cancel(){
				let {name, toDos} = this.thisNote
				this.thisNote.modified = JSON.parse(JSON.stringify({name , toDos}))
				this.thisNote = JSON.parse(JSON.stringify({...this.thisNote,...this.thisNote.beforeModifying}))
			},
			save(){
				let {name, toDos} = this.getNotes[this.index]
				this.thisNote.beforeModifying = JSON.parse(JSON.stringify({name , toDos}))
				let {name: name2, toDos: toDos2} = this.thisNote
				this.thisNote.modified = JSON.parse(JSON.stringify({name: name2, toDos: toDos2}))
				this.noteChanges({index: this.index, note: JSON.parse(JSON.stringify(this.thisNote)), action: 'save'})
				this.thisNote = JSON.parse(JSON.stringify(this.getNotes[this.index]))

			},
			returnChanges(){
					this.thisNote = JSON.parse(JSON.stringify({...this.thisNote, ...this.thisNote.modified}))
			},
			addNewTodo(){
				if(this.newTodo.todo.trim()){
					this.thisNote.toDos.push(this.newTodo)
				}
			}
		},
		mounted(){
			
		},
		created(){
			
			this.thisNote = JSON.parse(JSON.stringify(this.getNotes[this.index]))
			if(!Object.keys(this.thisNote.beforeModifying).length){
				let {name, toDos} = this.thisNote
				this.thisNote.beforeModifying = JSON.parse(JSON.stringify({name , toDos}))
			}
			
		}
	}
</script>
<style lang="sass" scoped>
.note
	display: grid
	grid-gap: 2rem
	width: 250px
	word-break: break-word
	margin-left: 1rem
	margin-top: 1rem
	.note__content
		display: grid
		grid-gap: 1rem
		.note__header
			display: grid
			grid-gap: 1rem
			color: #b9b0b0
			font-size: 3rem
		.todo__list
			display: grid
			grid-gap: 1rem
			.newTodo
				display: grid
				grid-gap: 1rem
	.note__options,.show_opt
		display: grid
		grid-gap: 0.5rem
		.reverseChanges
			display: grid
			grid-auto-flow: column
			grid-template-columns: 1fr 1fr
			grid-gap: 1rem
		.delete
			margin: 0
		

</style>