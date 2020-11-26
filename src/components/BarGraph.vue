<script>
import { HorizontalBar, mixins } from "vue-chartjs";
export default {
  name: "BarGraph",
  extends: HorizontalBar,
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
