<template lang="pug">
.app
	.navbar
		nav
			router-link.link.block(tag="div")(to="/") main
			router-link.link.block(tag="div")(to="/create") +
	router-view
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		components: {
		}
	}
</script>
<style lang="sass">
*
	color: #77a8a8
.navbar
	nav
		display: flex
		margin-bottom: 1rem
.link.block
	width: 100px
	height: 100px
	display: flex
	justify-content: center
	align-items: center
	font-size: 3rem
.btn
	border: 2px solid #77a8a8
	cursor: pointer
	font-size: 1rem
	padding: 10px
	display: flex
	justify-content: center
	align-items: center
.delete
	color: #d64161
	font-size: 1rem
	cursor: pointer
.colored
	font-size: 30px
	color: #77a8a8
.block
	padding: 20px
	min-width: 100px
	min-height: 100px
	border: 2px solid #77a8a8
	font-weight: bold
a
	text-decoration: none
</style>