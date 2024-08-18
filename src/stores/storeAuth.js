// stores/counter.js
import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useStoreNote } from './storeNotes';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNote();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')

          storeNotes.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes()
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('error.message:', error.message)
      });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((credentials) => {
        const user = credentials.user;
        // console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('Error message: ', error);
      });
    },
    logOutUser() {
      signOut(auth).then(() => {
        // Sign-out successful.
        // console.log('sign out')
      }).catch((error) => {
        // An error happened.
        // console.log(error.message)
      });
    }
  }
})