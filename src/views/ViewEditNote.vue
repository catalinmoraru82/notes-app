<template>
    <AddEditNote v-model="noteContent" ref="addEditNoteRef" bgColor="link" placeholder="Edit note" label="Edit note">
        <template #buttons>
            <button @click="$router.back()" class="button is-link is-light mr-4">
                Cancel
            </button>
            <button class="button is-link has-background-link" :disabled="!noteContent" @click="handleSaveClicked">
                Save note
            </button>
        </template>
    </AddEditNote>
</template>

<script setup>
  import { ref } from 'vue';
  import AddEditNote from '@/components/notes/AddEditNote.vue';
  import { useStoreNote } from '@/stores/storeNotes';
  import { useRoute, useRouter } from 'vue-router';

  const storeNotes = useStoreNote();
  const noteContent = ref();
  const route = useRoute();
  const router = useRouter();

  noteContent.value = storeNotes.getNoteContent(route.params.id);

  const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value);
    router.push('/')
  }
</script>
