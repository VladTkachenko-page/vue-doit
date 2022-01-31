<template>
  <UserLayout>
    <div v-if="!getCheckLoading" class="manage-team">
      <h2 class="manage-team__title title">{{ name }} - Manage</h2>
      <div class="manage-team__items">
        <router-link class="manage-team__item" :to="`/user/team/${this.id}`"
          >Edit Team</router-link
        >
        <router-link
          class="manage-team__item"
          :to="`/user/team/${this.id}/addPlayers`"
          >Add Players</router-link
        >
        <router-link
          class="manage-team__item"
          :to="`/user/team/${this.id}/players`"
          >Players</router-link
        >
        <router-link
          class="manage-team__item"
          :to="`/user/team/${this.id}/tournaments`"
          >Tournaments</router-link
        >
      </div>
    </div>
  </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  computed: mapGetters(["getTeam", "getCheckLoading"]),
  data() {
    return {
      id: "",
      name: ""
    };
  },

  components: {
    UserLayout,
  },

  async mounted() {
    this.id = this.$attrs.id;
    await this.$store.commit("setShowloader", true);
    await this.$store.dispatch("fetchTeam", this.$attrs.id);
    this.name = this.getTeam.name
    await this.$store.commit("setShowloader", false);
  },

  methods: {},
};
</script>

<style scoped>
.manage-team {
  width: 100%;
}
.manage-team__title {
  text-align: center;
  margin-bottom: 40px;
}
.manage-team__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 64px;
}
.manage-team__item {
  padding: 30px 15px;
  min-width: 230px;
  border: 2px solid #20252b;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}
</style>
