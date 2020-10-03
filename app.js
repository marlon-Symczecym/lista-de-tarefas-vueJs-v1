const vm = new Vue({
  el: "#app",
  data: {
    tasks: [],
    tasksConclude: [],
    describe: "",
    option: "",
  },
  watch: {
    tasks() {
      window.localStorage.tasks = JSON.stringify(this.tasks);
    },
    tasksConclude() {
      window.localStorage.tasksConclude = JSON.stringify(this.tasksConclude);
    },
  },
  methods: {
    addTask() {
      if (this.describe && this.option) {
        this.tasks.push({
          task: this.describe,
          option: this.option,
          conclude: false,
        });
        this.describe = "";
        this.option = "";
      }
    },
    loadingLocalStorage() {
      if (window.localStorage.tasks)
        this.tasks = JSON.parse(window.localStorage.tasks);
      if (window.localStorage.tasksConclude)
        this.tasksConclude = JSON.parse(window.localStorage.tasksConclude);
    },
    conclude(index) {
      this.tasksConclude.push({
        task: this.tasks[index].task,
        option: "conclude",
        conclude: true,
      });
      this.tasks.splice(index, 1);
    },
    deleteTask(index) {
      this.tasksConclude.splice(index, 1);
    },
  },
  created() {
    this.loadingLocalStorage();
    console.log(this.tasks);
  },
});

// TODO Implementar as actions do button de options de cada task
