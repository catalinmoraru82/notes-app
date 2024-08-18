<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                {{ note.content }}
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">{{ dateFormatted }}</small>
                    <small class="column has-text-right">{{charLength}}</small>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink :to="`/edit-note/${note.id}`" class="card-footer-item" href="#">Edit</RouterLink>
            <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
        </footer>
        <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id"/>
    </div>
</template>

<script setup>
import { useDateFormat } from '@vueuse/core';
import { computed, reactive } from 'vue';
import { useStoreNote } from '@/stores/storeNotes';
import { RouterLink } from 'vue-router';
import ModalDeleteNote from './ModalDeleteNote.vue';

const storeNotes = useStoreNote();


const props = defineProps({
  note: {
    type: Object,
    required: true
  }
});

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD.MM.YYYY');
})

const charLength = computed(() => {
    let length = props.note.content.length;
    let description = length > 1 ? 'characters' : 'character';
    return `${length} ${description}`;
});

const modals = reactive({
    deleteNote: false,
})

</script>