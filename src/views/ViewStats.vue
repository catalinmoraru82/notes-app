<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of notes</td>
                    <td>{{ storeNotes.totalNotesCount }}</td>
                </tr>
                <tr>
                    <td>Number of characters</td>
                    <td>{{ storeNotes.totalCharactersCount }}</td>
                </tr>
            </tbody>
        </table>
        <input class="input" type="text" placeholder="Do you love noteballs?" v-autofocus v-model="loveNoteballs">
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import { useStoreNote } from "@/stores/storeNotes";
    import { vAutofocus } from '@/directives/vAUtofocus';
    import { useWatchCharacters } from '@/use/useWatchCharacters';

    const storeNotes = useStoreNote();

    const loveNoteballs = ref('');

    useWatchCharacters(loveNoteballs, 50);
</script>