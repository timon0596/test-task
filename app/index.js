import Vue from 'vue'
import Vuex from 'vuex'
import vuerouter from 'vue-router'
import './reset.sass'

import app from './vue/app.vue'
import main from './vue/main.vue'
import create from './vue/create.vue'
import {mapActions,mapGetters,mapMutations} from 'vuex'
Vue.use(Vuex)
Vue.use(vuerouter)
const router = new vuerouter({
  routes:[
    {path: '/create', component: create},
    {path: '/', component: main},
  ]
})
const store = new Vuex.Store({
  state: {
    newNote:{
      name:"",
      tasks: []
    },
    notes: [
      {name: 'test', toDos: [{checked: false,todo: 'test task'},{checked: false,todo: 'test taqqqqqqqqqqqqqqqsk #2'}], beforeModifying: {}, modified: {}},
      null,
      {name: 'test', toDos: [{checked: false,todo: 'test task'},{checked: false,todo: 'test taqqqqqqqqqqqqqqqsk #2'}], beforeModifying: {}, modified: {}}
    ],
    
  },
  mutations: {
    newNote_addName(state,name){
      state.newNote.name=name
    },
    newNote_deleteName(state){
      state.newNote.name=""
    },
  	newNote_addTask(state,task){
      state.newNote.tasks.push({checked: false, todo: task})
    },
    newNote_deleteTask(state,taskToDelete){
      state.newNote.tasks.splice(taskToDelete,1)
    },
    pushNewNote(state,note){
      state.notes.push(note)
    },
    resetNewNote(state){
      state.newNote.name=""
      state.newNote.tasks=[]
    },
    noteChanges(state,noteState){
      state.notes[noteState.index]=noteState.note
      console.log(JSON.stringify(state.notes,null,2))
    },
    deleteNote(state, index){
      state.notes[index] = null
    },
    notesInitial(state){
      state.notes = state.notes.filter(note => note !== null)
    }
    
  },
  // actions: {
  // 	deleteNote({commit},i){
  //     commit('deleteNote')
  //   }
  // },
  getters: {
  	getNewNote(state){
      return state.newNote
    },
    getNotes(state){
      return state.notes
    },
  }	
})

new Vue({
	el: '.app',
	render: h=>h(app),
	store,
  router,
	methods:{
    ...mapMutations(['notesInitial'])
	},
  created(){
    this.notesInitial()
    this.$on('deleted',()=>{this.notesInitial()})
  }
	
})