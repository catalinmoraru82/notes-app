<template>
    <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
        <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            Are you sure you want to delete this note?
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
            <button class="button" @click="closeModal">Cancel</button>
            <button class="button is-danger" @click="store.deleteNote(noteId)">Delete</button>
        </div>
        </footer>
    </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreNote } from '@/stores/storeNotes';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noteId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const store = useStoreNote();

const modalCardRef = ref(null)


const closeModal = () => {
    emit('update:modelValue', false)
}

onClickOutside(modalCardRef, closeModal)

const handleKeyboard = (e) => {
    if(e.code === 'Escape') {
            closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard);
})
</script>