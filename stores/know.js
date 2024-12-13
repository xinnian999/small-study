import { defineStore } from "pinia";
import { uniqBy } from "lodash";
import mock from "./mock";

export const useKnowStore = defineStore("know", {
  state: () => {
    return {
      dataSource: mock,
      errors: [],
      index: 1,
    };
  },
  getters: {
    current() {
      return this.dataSource[this.index - 1];
    },
    total() {
      return this.current.no + this.current.yes;
    },
    accuracy() {
      return (
        (
          (this.current.yes / (this.current.no + this.current.yes)) *
          100
        ).toFixed() + "%"
      );
    },
  },
  actions: {
    handleYes() {
      this.current.yes++;
      if (this.index < this.dataSource.length) {
        this.index++;
      }
    },
    handleNo() {
      this.current.no++;
      this.errors.push(this.current);
      this.errors = uniqBy(this.errors, "id");
      if (this.index < this.dataSource.length) {
        this.index++;
      }
    },
    setErrors(errors) {
      this.errors = errors;
    },
    setDataSource(data) {
      this.dataSource = data;
    },
  },
  unistorage: {
    paths: ["dataSource", "errors"],
  },
});
