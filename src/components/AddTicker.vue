<template>
  <div class="flex">
    <div class="max-w-xs">
      <label for="wallet" class="block text-sm font-medium text-gray-700"
        >Тикер</label
      >
      <div class="mt-1 relative rounded-md shadow-md">
        <!-- v-on:chankge="add" -->
        <input
          v-model="ticker"
          @keydown.enter="add()"
          @input="changeAutocomplete()"
          type="text"
          name="wallet"
          id="wallet"
          class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          placeholder="Например DOGE"
        />
      </div>
      <!-- autocomplete -->
      <template v-if="autocomplete.length">
        <div class="flex bg-white p-1 rounded-md shadow-md flex-wrap">
          <span
            v-for="ticker in autocomplete"
            :key="ticker.name"
            @click="add()"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ ticker.name }}
          </span>
        </div>
        <div v-if="autocompleteError" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
        <div v-if="notFoundError" class="text-sm text-red-600">
          Такой тикер не существует
        </div>
      </template>
    </div>
  </div>
  <add-button @click="add()" type="button" class="my-4" :disabled="disabled" />
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  components: {
    AddButton,
  },

    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
    },

    emits: {
        "add-ticker": value => typeof value === "boolean"
    },

  data() {
    return {
      ticker: "",
      autocomplete: [],
      allTickers: [],
      autocompleteError: false,
      notFoundError: false,
    };
  },

  mounted() {
    fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true")
      .then((response) => response.json())
      .then((data) =>
        Object.values(data.Data).forEach((ticker) => {
          const newTicker = {
            name: ticker.Symbol,
            search: ticker.FullName.toUpperCase() + ticker.Symbol.toUpperCase(),
          };
          this.allTickers.push(newTicker);
        })
      );
  },

  methods: {
    add() {
      this.autocompleteError = false;
      this.notFoundError = false;

      // check for non-uniqueness
      if (
        this.tickers.filter((ticker) => ticker.name.toUpperCase() === name)
          .length > 0
      ) {
        this.autocompleteError = true;
        return;
      }

      // check ticker for correct
      if (
        this.allTickers.filter((ticker) => ticker.name === name).length === 0
      ) {
        this.notFoundError = true;
        return;
      }


      this.$emit("add-ticker", this.ticker);
      this.ticker = "";
    },

    changeAutocomplete() {
      this.autocomplete = [];
      this.autocompleteError = false;
      this.notFoundError = false;
      if (this.ticker === "") return;
      const tag = this.ticker.toUpperCase();
      for (const ticker of this.allTickers) {
        if (this.autocomplete.length >= 4) break;
        if (ticker.search.includes(tag)) {
          this.autocomplete.push(ticker);
        }
      }
    },
  },
};
</script>
