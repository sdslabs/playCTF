<template>
  <div class="challengesContainer">
    <div class="verticalNav">
      <button
        class="navButton"
        @click="changeCategory('All')"
        :class="{ active: categoryFilter === 'All' }"
      >
        All
      </button>
      <button
        class="navButton"
        @click="changeCategory('Crypto')"
        :class="{ active: categoryFilter === 'Crypto' }"
      >
        Crypto
      </button>
      <button
        class="navButton"
        @click="changeCategory('PWN')"
        :class="{ active: categoryFilter === 'PWN' }"
      >
        PWN
      </button>
      <button
        class="navButton"
        @click="changeCategory('Web')"
        :class="{ active: categoryFilter === 'Web' }"
      >
        Web
      </button>
      <button
        class="navButton"
        @click="changeCategory('Misc')"
        :class="{ active: categoryFilter === 'Misc' }"
      >
        Misc
      </button>
    </div>
    <div class="mainContainer">
      <div class="heading">
        <div class="headingName">CHALLENGES</div>
        <button class="addChallenge">
          <img class="addImg" src="@/assets/images/add.svg" />
          <span class="addText">Create New Challenge</span>
        </button>
      </div>
      <div class="sort">
        <span class="sortText">Sort by:</span>
        <a
          class="sortOption"
          :class="{ active: sortFilter === 'Name' }"
          @click="changeSort('Name')"
          >Name</a
        >
        <a
          class="sortOption"
          :class="{ active: sortFilter === 'Score' }"
          @click="changeSort('Score')"
          >Score</a
        >
        <a
          class="sortOption"
          :class="{ active: sortFilter === 'Solves' }"
          @click="changeSort('Solves')"
          >Solves</a
        >
        <v-select
          class="dropdown"
          :options="['All', 'Deployed', 'Undeployed', 'Purged']"
          :value="this.statusFilter"
          @input="changeFilter"
          :clearable="false"
          :searchable="false"
        >
          <template #selected-option="item" class="selection">
            <span class="filterText">Filter By:</span
            ><span class="filterSelection">{{ item.label }}</span>
          </template>
        </v-select>
      </div>
      <div class="challenges">
        <admin-chall-card
          v-for="challenge in challenges"
          :key="challenge.id"
          :challenge="challenge"
        />
      </div>
    </div>
  </div>
</template>
<script>
import adminChallCard from "../components/adminChallCard.vue";
export default {
  name: "AdminChallenges",
  components: { adminChallCard },
  data() {
    return {
      statusFilter: "All",
      sortFilter: "Name",
      categoryFilter: "All",
      challenges: [
        {
          id: 1,
          name: "Really Simple Algorithm",
          category: "PWN",
          status: "Deployed",
          points: 25,
          solves: 325
        },
        {
          id: 2,
          name: "Really Simple Algorithm",
          category: "PWN",
          status: "Deployed",
          points: 25,
          solves: 325
        },
        {
          id: 3,
          name: "Really Simple Algorithm",
          category: "PWN",
          status: "Deployed",
          points: 25,
          solves: 325
        },
        {
          id: 4,
          name: "Really Simple Algorithm",
          category: "PWN",
          status: "Deployed",
          points: 25,
          solves: 325
        },
        {
          id: 5,
          name: "Really Simple Algorithm",
          category: "PWN",
          status: "Deployed",
          points: 25,
          solves: 325
        }
      ]
    };
  },
  mounted(){
    axios.post(`${hostUrl}/api/notification/available`).then(response => {
      if (response.status !== 200) {
        console.log(response.data);
      } else {
        console.log(response);
        this.notifications = response.data;
      }
    });
  },
  methods: {
    changeFilter(value) {
      this.statusFilter = value;
    },
    changeSort(value) {
      this.sortFilter = value;
    },
    changeCategory(value) {
      this.categoryFilter = value;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/adminChallenges.scss";
</style>
