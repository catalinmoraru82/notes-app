<template>
    <div class="card p-4" :class="`has-background-${bgColor}-dark`">
        <label v-if="label" class="label has-text-white">
            {{ label }}
        </label>
        <div class="field">
            <div class="control mb-4">
                <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="textarea" :placeholder="placeholder" ref="textAreaRef" v-autofocus maxlength="100" />
            </div>

            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <slot name="buttons" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAUtofocus';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor: {
      type: String,
      default: 'primary'
    },
    placeholder: {
      type: String,
      default: 'Somtehing ....'
    },
    label: {
      type: String,
    }
});

const textAreaRef = ref(null)

const focusTextArea = () => {
  textAreaRef.value.focus()
}

defineExpose({
  focusTextArea
})

const emit = defineEmits(['update:modelValue']);

</script>
