<script setup lang="ts">
import CommandIcon from 'vue-material-design-icons/AppleKeyboardCommand.vue';
import ShiftIcon from 'vue-material-design-icons/AppleKeyboardShift.vue';
import ChevronTop from 'vue-material-design-icons/ChevronUp.vue';

defineProps<{
  isCommand?: boolean;
  isAlt?: boolean;
  isShift?: boolean;
  hotkey: string;
}>();
</script>

<template>
  <Transition>
    <div class="hotkey">
      <CommandIcon
        v-if="isCommand"
        class="hotkey__icon"
        :size="14"
      />
      <ShiftIcon
        v-if="isShift"
        class="hotkey__icon"
        :size="14"
      />
      <ChevronTop
        v-if="isAlt"
        class="hotkey__icon"
        :size="14"
      />
      <div class="hotkey__text">
        {{ hotkey }}
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.hotkey {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 21px;
  align-items: center;
  padding: 4.5px 7.5px;
  background-color: var(--color-normal-40);
  color: var(--color-normal-90);
  border: 0.5px solid var(--color-normal-50);
  border-radius: 2px;
  font-size: var(--fz-small);
  line-height: 74.5%;
  cursor: initial;
  user-select: none;

  &__text {
    margin-left: 2px;
  }

  &__icon {
    display: block;
  }
}
</style>
