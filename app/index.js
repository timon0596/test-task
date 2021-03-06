import Vue from 'vue'
import Vuex from 'vuex'
import vuerouter from 'vue-router'
import './reset.sass'

import app from './vue/app.vue'
import main from './vue/main.vue'
import create from './vue/create.vue'
import note from './vue/note.vue'
import {mapActions,mapGetters,mapMutations} from 'vuex'
Vue.use(Vuex)
Vue.use(vuerouter)
const router = new vuerouter({
  routes:[
    {path: '/create', component: create},
    {path: '/', component: main, name: 'main'},
    {path: '/notes/:index', component: note, props: true,name: 'note'},
  ]
})
const store = new Vuex.Store({
  state: {
    newNote:{
      name:"",
      tasks: []
    },
    notes: [
      {name: 'test', toDos: [{checked: false,todo: 'test task'},{checked: false,todo: 'test task'},{checked: false,todo: 'test task'},{checked: false,todo: 'test taqqqqqqqqqqqqqqqsk #2'}], beforeModifying: {}, modified: {}},
      null,
      {name: 'test', toDos: [{checked: false,todo: 'test task'},{checked: false,todo: 'test task #2 test task #2'}], beforeModifying: {}, modified: {}}
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
  async created(){
    if(localStorage.getItem('notes')){
      this.$store.state.notes = JSON.parse(localStorage.getItem('notes'))
    }
    this.notesInitial()
    this.$on('deleted',()=>{this.notesInitial()})
    let thiss = this
    window.onbeforeunload = function(e)
    {  

       localStorage.setItem('notes', JSON.stringify(thiss.$store.state.notes))
    }
  }
	
})