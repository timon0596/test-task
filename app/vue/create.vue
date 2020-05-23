<template lang="pug">
.create.block
	.container
		input.note(ref="note" @change="newNote_addName($event.target.value)" placeholder="имя заметки")
		input.todo(ref="todo" placeholder="наименование задачи")
		.btn(@click="addTask") добавить задачу
		.note__wrapper
			.note__name {{getNewNote.name}}
				.delete(v-show="getNewNote.name" @click="newNote_deleteName") удалить
			.todo__list
				todo(v-for="(task,index) in getNewNote.tasks" :task="task" :key="index")
			.note__add.btn(@click="addThisNote") добавить заметку
</template>
<script>
	// import admin from "./admin.vue"
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import 'jquery'
	import todo from './newTodo.vue'
	export default {
		
		components:{
			todo
		},
		computed:{
			...mapGetters(['getNewNote'])
		},
		methods: {
			...mapMutations(['newNote_addTask','newNote_addName','newNote_deleteName','pushNewNote','resetNewNote']),
			addTask(){

				let val = $(this.$refs.todo).val()
				val = $.trim(val)

				val?//пустое ли значение todo
					this.newNote_addTask(val)//добавить значение в массив
					:null
			},
			addThisNote(){
				if(this.getNewNote.name&&this.getNewNote.tasks.length){ //проверка наличия имени и хотя бы одного ToDo у новой заметки
					this.pushNewNote({name: this.getNewNote.name, toDos: this.getNewNote.tasks, beforeModifying: {}, modified: {}})
					this.resetNewNote()
				}
			}
		}

	}
</script>
<style lang="sass" scoped>
.create.block
	width: 300px
	padding: 50px 20px
	height: min-content
	justify-items: start
	*
		height: min-content
		justify-self: stretch
		max-width: 300px
		word-wrap: break-word
.container
	display: grid
	grid-gap: 1rem
	justify-items: start

.todo__list
	.todo
		font-size: 1.5rem
.note__wrapper
	display: grid
.note__add.btn
	justify-self: end
</style>