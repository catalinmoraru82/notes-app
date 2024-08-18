// stores/counter.js
import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { useStoreAuth } from './storeAuth';

let notesCollectionRef = null
let notesCollectionQuery = null
let getNotesSnapshot = null

export const useStoreNote = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [],
        notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()

      notesCollectionRef = collection(db, "users", storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false;

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        });
        this.notes = notes;
        this.notesLoaded = true;
      }, error => {
        console.log(error)
      });
    },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() //unsubscribe
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime();
      let date = currentDate.toString();

      // this.notes.unshift(note);
      // await setDoc(doc(notesCollectionRef, id), {
      //   id,
      //   content: newNoteContent
      // });

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })
    },
    async deleteNote(idToDelete) {
      // this.notes = this.notes.filter((note) => note.id !== idToDelete);
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      // const index = this.notes.findIndex(note => note.id === id)

      // this.notes[index].content = content

      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.find(item => item.id === id).content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.map(note => count += note.content.length );
      return count
    }
  }
})