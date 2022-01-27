<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      class="tabs__item"
      @click="$emit('selected', tab.name)"
      :class="{ 'tabs__item-active': this.active === tab.name }"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["tabs", "active"],
};
</script>

<style scoped>
.tabs {
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px;
}
.tabs__item {
  color: #a0a5ad;
  background: #14191f;
  padding: 20px 40px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  cursor: pointer;
}
.tabs__item:hover {
  background: #d8dfeb;
  color: #20252b;
}
.tabs__item-active {
  background: #d8dfeb;
  color: #20252b;
}
@media (max-width: 1100px) {
  .tabs {
    gap: 7px;
  }
}
</style>
