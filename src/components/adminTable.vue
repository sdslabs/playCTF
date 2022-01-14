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
        <tr class="adminTableUserRow" v-if="this.userData">
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
        <tbody class="adminTableBody">
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
          :break-view-link-class="'breakItemlink-'"
          :no-li-surround="true"
          :hide-prev-next="true"
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
  data() {
    return {
      jumpPage: 1,
      currentPage: 1,
      tableRows: []
    };
  },
  mounted() {
    this.tableRows = this.get_rows();
  },
  props: [
    "tableCols",
    "rows",
    "colStyle",
    "links",
    "maxElementPerPage",
    "userData"
  ],
  methods: {
    isColLink(val) {
      let isLink = false;
      this.links.forEach(item => {
        if (item.col === val) {
          isLink = true;
        }
      });
      return isLink;
    },
    getRedirectLink(val, username) {
      var redirectLink = "";
      this.links.forEach(item => {
        if (item.col === val) {
          redirectLink = item.redirect + username;
        }
      });
      return redirectLink;
    },
    changePage() {
      this.currentPage = this.jumpPage;
      this.tableRows = this.get_rows();
    },
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
      this.tableRows = this.get_rows();
    },
    get_rows() {
      let start = (this.currentPage - 1) * this.maxElementPerPage;
      let end = start + this.maxElementPerPage;
      return this.rows.slice(start, end);
    }
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    },
    pageCount() {
      if (
        Math.round(this.rows.length / this.maxElementPerPage) ===
        this.rows.length / this.maxElementPerPage
      )
        return Math.round(this.rows.length / this.maxElementPerPage);
      else return Math.floor(this.rows.length / this.maxElementPerPage) + 1;
    }
  }
};
</script>
