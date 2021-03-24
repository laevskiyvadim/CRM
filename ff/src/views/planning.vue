<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency("RUB") }}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!loading && !categories.length">
      Категорий нет.<router-link to="/categories"
        >Добавить новую категорию</router-link
      >
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :style="{ width: cat.progressPercent + '%' }"
            :class="[cat.progressColor]"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";
export default {
  name: "planning",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategory");
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((c) => c.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, r) => (total += r.amount), 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на " : "Осталось "
      }${currencyFilter(Math.abs(tooltipValue))}`;
      console.log({
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      });
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>