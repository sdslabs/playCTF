<template>
  <div class="adminChallengesContainer">
    <div class="adminChallengesVerticalNav">
      <button v-for="category in this.categoryFilterOptions"
        :key="category.id"
        class="navButton"
        @click="changeCategory(category.name)"
        :class="{ active: categoryFilter === category.name }"
      >
      {{category.name}}
      </button>
    </div>
    <div class="mainContainerAdChal">
      <div class="adminHeadingChal">
        <div class="adminHeadingName">CHALLENGES</div>
        <button class="addChallenge">
          <img class="addImg" src="@/assets/add.svg" />
          <span class="addText">Create New Challenge</span>
        </button>
      </div>
      <div class="adminSort">
        <span class="sortText">Sort by:</span>
        <a
          v-for="sort in this.sortFilterOptions"
          :key="sort.id"
          class="sortOption"
          :class="[{ active: sortFilter === sort.name }]"
          @click="changeSort(sort.name)"
        >
          {{ sort.name }}
        </a>
        <v-select
          class="dropdown"
          :options="statusFilterOptions"
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
      <div class="adminChallengesList">
        <admin-chall-card
          v-for="challenge in displayChallenges"
          :key="challenge.ChallId"
          :challenge="challenge"
        />
      </div>
    </div>
  </div>
</template>
<script>
import adminChallCard from "../components/adminChallCard.vue";
import ChalService from "../api/admin/challengesAPI";
export default {
  name: "AdminChallenges",
  components: { adminChallCard },
  data() {
    return {
      statusFilter: "All",
      sortFilter: "Name",
      categoryFilter: "All",
      challenges: [],
      displayChallenges: [],
      categoryFilterOptions: [
        { name: "All", id: 1 },
      ],
      sortFilterOptions: [
        { name: "Name", id: 1 },
        { name: "Score", id: 2 },
        { name: "Solves", id: 3 },
      ],
      statusFilterOptions: ["All", "Deployed", "Undeployed"],
    };
  },
  mounted() {
    ChalService.getChallenges().then((response)=>{
      if(response===null){
        console.log("Error fetching All challenges");
      }else{
        this.challenges = response.challenges;
        this.displayChallenges = response.displayChallenges;
        this.categoryFilterOptions = [...this.categoryFilterOptions,...response.categoryFilterOptions];
        this.displayChallenges = response.displayChallenges;
      }
    })
  },
  methods: {
    changeFilter(value) {
      this.statusFilter = value;
      if (value === "All") {
        this.displayChallenges = this.challenges;
      } else {
        this.displayChallenges = this.challenges.filter((el) => {
          return el.Status == value;
        });
      }
    },
    changeSort(value) {
      this.sortFilter = value;
      if(value==="Name"){
        this.displayChallenges = this.displayChallenges.sort((a,b)=>{
          return (a.Name>b.Name?1:-1);
        })
      }else if(value==='Score'){
      this.displayChallenges = this.displayChallenges.sort((a,b)=>{
          return (a.Points<=b.Points?a.Points===b.Points?a.Name>b.Name?1:-1:1:-1);
        })
      }else if(value==="Solves"){
        this.displayChallenges = this.displayChallenges.sort((a,b)=>{
          return (a.SolvesNumber<=b.SolvesNumber?a.SolvesNumber===b.SolvesNumber?a.Name>b.Name?1:-1:1:-1);
        });
        console.log(this.displayChallenges);
      }
    },
    changeCategory(value) {
      this.categoryFilter = value;
      if (value === "All") {
        this.displayChallenges = this.challenges;
      } else {
        this.displayChallenges = this.challenges.filter((el) => {
          return el.Category == value;
        });
      }
    },
  },
};
</script>


