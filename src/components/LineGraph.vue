<script>
import { Line, mixins } from "vue-chartjs";
export default {
  name: "LineGraph",
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "options"],
  watch: {
    chartData: {
      handler(newData) {
        if (!newData) return;
        
        if (newData.update && this.$data._chart) {
          this.$data._chart.destroy();
          console.log("Updating chart");
          this.renderChart(newData, this.options);
        }
      },
      deep: true
    }
  },
  mounted() {
    console.log("Chart data", this.chartData);
    console.log("Options", this.options);
    if (this.chartData) {
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>
