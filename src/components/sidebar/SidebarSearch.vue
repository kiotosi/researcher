<script setup lang="ts">
import {ref} from 'vue';
import HotkeyMain from '../design/HotkeyMain.vue';
import debounce from '../../utils/debounce';

const inputText = ref('');
const debounceSearch = debounce(() => search(inputText.value), 250);

/**
 * Search through the all content in workspace
 * @param text Input text
 */
function search(text: string) {
  console.log(text);
}
</script>

<template>
  <div class="sidebar-search">
    <input
      v-model="inputText"
      placeholder="Search for something.."
      spellcheck="false"
      type="text"
      class="sidebar-search__input"
      @input="debounceSearch"
    >
    <div class="sidebar-search__hotkey">
      <HotkeyMain
        :is-command="true"
        hotkey="K"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-search {
  position: relative;
  background-color: var(--color-normal-20);
  border: 1px solid var(--color-normal-30);
  border-radius: 4px;
  display: flex;
  align-items: center;

  &__input {
    color: var(--color-normal-800);
    outline: none;
    border: none;
    background-color: transparent;
    padding: 10px 12px;
    font-weight: 500;


    &::placeholder {
      color: var(--color-normal-90);
    }
  }

  &__hotkey {
    margin-left: 4px;
    transition: all .1s ease-in-out;
    transform: scale(1);
  }

  // If input is focused - hide hotkey
  &__input:focus + &__hotkey {
    transform: scale(0);
  }
}
</style>