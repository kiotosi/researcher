<script setup lang="ts">
import CogIcon from 'vue-material-design-icons/Cog.vue';
import UserIcon from 'vue-material-design-icons/Account.vue';
import InformationIcon from 'vue-material-design-icons/InformationOutline.vue';
import { useRouter } from 'vue-router';
import routeInfo from '../../data/router.define';

const router = useRouter();
</script>

<template>
  <div class="sidebar-footer">
    <CogIcon class="sidebar-footer__icon" />
    <UserIcon class="sidebar-footer__icon" />
    <InformationIcon @click="router.push(routeInfo.info.path)" class="sidebar-footer__icon" />
  </div>
</template>

<style scoped lang="scss">
.sidebar-footer {
  position: absolute;
  bottom: 16px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-around;
  gap: 12px;

  &__icon {
    cursor: pointer;
    color: var(--color-normal-70);

    &:hover {
      color: var(--color-normal-90);
    }
  }
}
</style>
