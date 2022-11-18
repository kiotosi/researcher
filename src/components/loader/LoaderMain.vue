<script setup lang="ts"></script>

<template>
  <Transition>
    <div class="loader">
      <div class="loader__wrapper">
        <h1 class="loader__heading">
          Researcher
        </h1>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.loader {
  position: absolute;
  background-color: var(--color-normal-0);
  inset: 0;
  z-index: 1000;
  user-select: none;
  touch-action: none;

  &__wrapper {
    position: absolute;
    z-index: 1001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__heading {
    font-size: 48px;
    line-height: initial;

    &::after {
      content: '...';
      animation: dot_animation 2s infinite forwards cubic-bezier(0.165, 0.84, 0.44, 1);
      position: absolute;
      overflow: hidden;
      bottom: 0;
      left: 101%;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@keyframes dot_animation {
  from {
    width: 0;
  }

  33% {
    width: 15px;
  }

  66% {
    width: 30px;
  }

  to {
    width: 45px;
  }
}
</style>
