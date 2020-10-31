<script>
import { Doughnut, mixins } from "vue-chartjs";
export default {
  name: "PieChart",
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "options"],
  watch: {
    chartData: function() {
      this.$data._chart.destroy();
      this.renderChart(this.chartData, this.options);
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>