<template lang="pug">
.note.block(:class="{ limitedScale: $route.name=='main'}")
	.block__mask(v-if="$route.name=='main'")
	.note__content
		.note__header {{thisNote.name}}
			input(v-show="redacting" name="name" v-model:value="thisNote.name")
			.delete.delete__name.btn(v-show="redacting" @click="thisNote.name=''") очистить
		.todo__list
			todo(@deletetask="deleteTask($event)" v-for="(todo,index) in thisNote.toDos"
				v-if="($route.name=='main'&&index<2)||$route.name=='note'"
				:redacting="redacting" 
				:todo="todo" :index="index" 
				:key="index")
			.newTodo(v-show="redacting")
				.newTodo__text {{newTodo.todo}}
				input(v-model="newTodo.todo")
				.btn.newTodo__add(@click="addNewTodo") добавить задачу
	.note__options
		.redact.btn(@click="redact" v-show="$route.name=='note'") редактировать
		.show_opt(v-show="redacting")
			.save.btn(@click="save") сохранить 
			.reverseChanges
				.cancel.btn(@click="cancel") отменить
				.returnChanges.btn(@click="returnChanges") вернуть изменение
			.delete.delete__note.btn(@click="toBeDeleted=index;showPopup=true") удалить заметку
	.pop-up(v-if="$route.name=='note'" v-show="showPopup")
		.pop-up__container удалить?
			.pop-up__body
				.btn.delete(@click="noteDelete(toBeDeleted);showPopup=false") да
				.btn(@click="showPopup=false") отмена
	.pop-up(v-if="$route.name=='note'" v-show="showPopupR")
		.pop-up__container отменить редактирование?
			.pop-up__body
				.btn.delete(@click=";showPopupR=false;redacting=!redacting") да
				.btn(@click="showPopupR=false") отмена
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import todo from './todo.vue'
	export default {
		name: 'note',
		data(){
			return {
				toBeDeleted: null,
				showPopup: false,
				showPopupR: false,
				index: null,
				newTodo: {checked: false, todo: ''},
				redacting: false,
				thisNote: null
			}
		},
		components: {
			todo
		},
		props: ['i'],
		computed:{
			...mapGetters(['getNotes']),
		},
		methods: {
			...mapMutations(['noteChanges','deleteNote']),
			noteDelete(i){
				this.deleteNote(i)
				this.$el.style.display = "none"
				this.$root.$emit('deleted')

			},
			redact(){
				if(this.redacting){
					this.showPopupR=true
				}
				else{
					this.redacting=!this.redacting
				}
			},
			deleteTask(e){
				this.thisNote.toDos.splice(e,1)
			},
			cancel(){
				let {name, toDos} = this.thisNote
				this.thisNote.modified = JSON.parse(JSON.stringify({name , toDos}))
				this.thisNote = {...this.thisNote,...this.thisNote.beforeModifying}
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
					this.thisNote = {...this.thisNote, ...this.thisNote.modified}
			},
			addNewTodo(){
				if(this.newTodo.todo.trim()){
					this.thisNote.toDos.push(JSON.parse(JSON.stringify(this.newTodo)))
				}
			}
		},

		created(){
			this.index = this?.i ?? this.$route.params.index
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
	position: relative
	display: grid
	grid-gap: 2rem
	width: 250px
	word-break: break-word
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
.limitedScale
	height: 200px
	overflow: hidden
.block__mask
	position: absolute
	left: 0
	top: 0
	width: 100%	
	height: 100%
	background: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 80%)
</style>