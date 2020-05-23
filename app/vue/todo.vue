<template lang="pug">
.todo__container(:class="{checked: todo.checked}")
	input(type="checkbox" v-model:checked="todo.checked" v-show="redacting")
	.todo
		.todo__text {{todo.todo}}
			input(v-show="redacting" v-model:value="todo.todo")
			.delete.btn(v-show="redacting" @click="deleteTask") удалить задачу
</template>
<script>
	export default {
		data(){
			return {
			}
		},
		props: ['redacting','todo','index'],
		methods:{
			deleteTask(){
				this.$emit('deletetask',this.index)
			}
		}

		
		
	}
</script>
<style lang="sass" scoped>
.checked
	background: #b5e7a0
.todo__container
	display: grid
	align-items: baseline
	grid-template-columns: auto 1fr
	justify-content: start
	.todo
		justify-self: stretch
		display: grid
		.todo__text
			display: grid
			grid-gap: 1rem
		.btn
			justify-self: start
</style>
