<template>
  <div>
    <div class="adminTableContainer">
      <table class="adminTable">
        <thead class="adminTableHead">
          <th
            v-for="tableCol in tableCols"
            :style="tableCol.style"
            :key="tableCol.id"
            class="adminTableHeader"
          >
            {{ tableCol.label }}
          </th>
        </thead>
        <tbody class="adminTableBody">
          <tr class="adminTableUserRow" v-if="this.userData && !this.keys">
          <td class="adminTableData adminTableUserData adminTablerank">
            {{ this.userData.rank }}
          </td>
          <td class="adminTableData adminTableUserData adminTableusername">
            {{ this.userData.username }}
          </td>
          <td class="adminTableData adminTableUserData adminTablerank">
            {{ this.userData.score }}
          </td>
        </tr>
        <tr class="adminNullRow"></tr>
        <tr v-for="row in tableRows" :key="row.rank" class="adminTableRow">
          <td
            v-for="col in columns"
            :key="col.id"
            class="adminTableData"
            :class="[
              {
                  green:
                    col === 'status' &&
                    (row.status === 'Active' || row.status === 'Correct'),
                  red:
                    col === 'status' &&
                    (row.status === 'Banned' || row.status === 'Incorrect'),
                  bannedTableData:
                    row.status === 'Banned' &&
                    (col === 'rank' || col === 'score')
                },
                `adminTable${col}`
              ]"
            >
              <router-link
                class="adminTableLink"
                v-if="isColLink(col)"
                :to="getRedirectLink(col, row[col])"
              >
                {{ row[col] }}
              </router-link>
              <span v-else>
                {{ row[col] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paginateContainer">
      <div class="pagination">
        <paginate
          v-if="pageCount - 1"
          v-model="currentPage"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :page-range="3"
          :margin-pages="2"
          :prev-text="'Previous'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-link-class="'pageItem'"
          :prev-link-class="'prevItem'"
          :next-link-class="'nextItem'"
          :active-class="'activePageItem'"
          :break-view-link-class="'breakItemlink-'"
          :no-li-surround="true"
          :hide-prev-next="false"
          :prev-handler="handlePrevClick"
          :next-handler="handleNextClick"
        />
      </div>
      <div v-if="pageCount - 1" class="jumpPage">
        <span>Jump to</span>
        <form class="form" @submit="changePage">
          <input
            type="number"
            v-model="jumpPage"
            :min="1"
            :max="pageCount"
            class="pageInput"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminTable",
  components: {},
  props: {
    tableCols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    colStyle: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => []
    },
    maxElementPerPage: {
      type: Number,
      default: 25
    },
    userData: {
      type: Object,
      default: () => ({})
    },
    keys: {
      type: String,
      default: ''
    },
    totalUsers: {
      type: Number,
      default: 0,
      validator: value => value >= 0
    }
  },
  data() {
    return {
      currentPage: 1,
      jumpPage: ""
    };
  },
  watch: {
    totalUsers() {
      this.currentPage = 1;
      this.$emit('page-changed', 1);
    },
    currentPage(newPage, oldPage) {
      if (newPage !== oldPage) {
        this.$emit('page-changed', newPage);
      }
    }
  },
  methods: {
    isColLink(val) {
      if (!this.links) return false;
      return this.links.some(link => {
        const colObj = this.tableCols.find(col => col.id === parseInt(val));
        return colObj && link.col.toLowerCase() === colObj.label.toLowerCase();
      });
    },
    getRedirectLink(val, username) {
      if (!this.links) return "";
      const colObj = this.tableCols.find(col => col.id === parseInt(val));
      if (!colObj) return "";
      
      const link = this.links.find(link => link.col.toLowerCase() === colObj.label.toLowerCase());
      if (!link) return "";
      return `${link.redirect}${username}`;
    },
    changePage(e) {
      e.preventDefault();
      const page = parseInt(this.jumpPage);
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
      }
      this.jumpPage = "";
    },
    pageChangeHandler(selectedPage) {
      if (selectedPage >= 1 && selectedPage <= this.pageCount) {
        this.currentPage = selectedPage;
      }
    },
    handlePrevClick() {
      if (this.currentPage > 1) {
        this.pageChangeHandler(this.currentPage - 1);
      }
    },
    handleNextClick() {
      if (this.currentPage < this.pageCount) {
        this.pageChangeHandler(this.currentPage + 1);
      }
    }
  },
  computed: {
    tableRows() {
      return this.rows;
    },
    columns() {
      if (!this.tableCols || this.tableCols.length === 0) return [];
      return this.tableCols.map(col => col.id);
    },
    pageCount() {
      return Math.max(1, Math.ceil(this.totalUsers / this.maxElementPerPage));
    }
  }
};
</script>
