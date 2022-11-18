<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useConfigStore } from '../../store/configStore';

const router = useRouter();
const currentRouteLink = computed(() => router.currentRoute.value.path);
const configStore = useConfigStore();
const activeSections = computed(() => configStore.activeSections);
</script>

<template>
  <nav class="sidebar-navigation">
    <ul class="sidebar-navigation__list navigation-list">
      <li
        v-for="section in activeSections"
        :key="section.id"
        class="navigation-list__item section"
        :class="{'section_active': section.hrefName === currentRouteLink}"
        @click="router.push(section.hrefName)"
      >
        <div class="section__description">
          <div class="section__emoji">
            {{ section.emoji }}
          </div>
          <div class="section__name">
            {{ $t('sidebar.sectionNames.' + section.title) }}
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.sidebar-navigation {
  width: 100%;
}

.navigation-list {
  width: 100%;
  margin: 0;
  padding: 0;

  &__item + &__item {
    margin-top: 8px;
  }
}

.section {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  width: 100%;
  height: 45px;
  border: 1px solid transparent;
  user-select: none;

  &__description {
    display: flex;
  }

  &__name {
    margin-left: 12px;
    user-select: none;
  }

  &__emoji {
    user-select: none;
  }

  &:hover {
    background-color: var(--color-normal-30);
    color: var(--color-normal-700);
    border-color: var(--color-normal-40);
  }

  &_active {
    background-color: var(--color-normal-20);
    border-color: var(--color-normal-30);
  }
}
</style>