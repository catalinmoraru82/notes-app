<template>
    <div class="notes">
        <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add new note">
            <template #buttons>
                <button @click="addNote" :disabled="!newNote" class="button is-link has-background-success">
                    Add new note
                </button>
            </template>
        </AddEditNote>

        <progress v-if="!storeNotes.notesLoaded" class="progress is-link" max="100" />
        
        <template v-else>
          <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
        </template>

        <div v-if="!storeNotes.notes.length" class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-4">
          No notes yet ...
        </div>
    </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import Note from '@/components/notes/Note.vue';
  import { useStoreNote } from '@/stores/storeNotes';
  import AddEditNote from '@/components/notes/AddEditNote.vue';
  import { useWatchCharacters } from '@/use/useWatchCharacters';

  const newNote = ref();
  const storeNotes = useStoreNote();
  const addEditNoteRef = ref(null);

  const addNote = (e) => {

      storeNotes.addNote(newNote.value);

      newNote.value = '';
      addEditNoteRef.value.focusTextArea()
  }

  useWatchCharacters(newNote)
</script>
