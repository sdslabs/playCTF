<template>
  <div>
    <div class="leaderboard">
      <table class="leaderboardTable">
        <thead class="tableHead">
          <th
            v-for="tableCol in tableCols"
            :style="tableCol.style"
            :key="tableCol.id"
          >
            {{ tableCol.label }}
          </th>
        </thead>
        <tbody class="tableBody">
          <tr v-for="row in get_rows()" :key="row.rank" class="leaderRow">
            <td
              v-for="col in columns"
              :key="col.id"
              :class="[
                {
                  green:
                    col === 'status' &&
                    (row.status === 'Active' || row.status === 'Correct'),
                  red:
                    col === 'status' &&
                    (row.status === 'Banned' || row.status === 'Incorrect')
                },
                col
              ]"
            >
              <router-link
                class="link"
                v-if="col === linkCol"
                :to="redirectLink + row[col]"
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
          v-model="currentPage"
          :page-count="rows.length / maxElementPerPage"
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
        >
          >
        </paginate>
      </div>
      <div class="jumpPage">
        <span>Jump to</span>
        <form class="form" @submit="changePage">
          <input
            type="number"
            v-model="jumpPage"
            :min="1"
            :max="rows.length / maxElementPerPage"
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
      currentPage: 1
    };
  },
  props: [
    "tableCols",
    "rows",
    "redirectLink",
    "colStyle",
    "linkCol",
    "maxElementPerPage"
  ],
  methods: {
    changePage() {
      this.currentPage = this.jumpPage;
    },
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.rows.sort(function(a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
    num_pages: function num_pages() {
      return Math.ceil(this.rows.length / this.maxElementPerPage);
    },
    get_rows: function get_rows() {
      var start = (this.currentPage - 1) * this.maxElementPerPage;
      var end = start + this.maxElementPerPage;
      return this.rows.slice(start, end);
    },
    change_page: function change_page(page) {
      this.currentPage = page;
    },
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
    }
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
%backgroundColor {
  background: #e7e7e7;
}
$screenRatio: 1;
.leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  .heading {
    font-family: "Nunito Sans", sans-serif;
    font-size: 24px;
    line-height: 28px;
    font-weight: 900;
    color: #ff6700;

    .board {
      color: black;
    }
  }

  .leaderboardTable {
    border-spacing: 0;

    td {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 32px;
    }
    .link {
      text-decoration: none;
      color: #593c8f;
    }
    .link:hover {
      text-decoration: underline;
    }
    .rank {
      text-align: center;
    }

    .teamName,
    .username,
    .email {
      color: #593c8f;
      padding-left: 20px;
    }
    .category {
      text-align: center;
    }
    .timeDate {
      padding-left: 20px;
    }
    .score {
      text-align: center;
    }
    .status {
      text-align: center;
      padding-right: 20px;
    }
    .green {
      color: #00902b;
    }
    .red {
      color: #d72c27;
    }

    width: 648px;
    margin-top: 50px;

    th {
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 32px;
    }

    tr {
      height: 32px;
    }

    tr:nth-child(2n + 1) {
      @extend %backgroundColor;
    }

    .number {
      display: inline-block;
      padding: 4px 10px;
      color: #fff;
      border-radius: 4px;
      background-color: #f7f7f7;
      margin: 0px 5px;
      cursor: pointer;
    }
  }
}

.pagination {
  display: flex;
  list-style-type: none;
}

.pageItem {
  width: 15px * $screenRatio;
  margin-left: 5px * $screenRatio;
  margin-right: 5px * $screenRatio;
  outline: none;
}

.pageItem.active {
  color: #191919;
  font-weight: bold;
}

.nextItem {
  color: #593c8f;
  margin-left: 10px * $screenRatio;
  outline: none;
}

.nextItem.disabled {
  color: rgba(89, 60, 143, 0.57);
}

.prevItem {
  color: #593c8f;
  margin-right: 10px * $screenRatio;
  outline: none;
}

.prevItem.disabled {
  color: rgba(89, 60, 143, 0.57);
}

.paginateContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 14px * $screenRatio;
  line-height: 16px * $screenRatio;
  color: #575757;
  justify-content: space-between;
  margin-top: 20px * $screenRatio;
}

.jumpPage {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #191919;
  font-weight: bold;
}

.pageInput {
  margin-left: 5px * $screenRatio;
  color: #191919;
  background: #f2f2f2;
  box-shadow: inset 0px 6px 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  text-align: center;
  outline: none;
  width: 40px * $screenRatio;
}
</style>
