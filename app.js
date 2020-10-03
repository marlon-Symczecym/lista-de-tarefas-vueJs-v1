const vm = new Vue({
  el: "#app",
  data: {
    tasks: [],
    tasksConclude: [],
    describe: "",
    option: "",
    active: false,
    modalStyle: {},
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
          id: Math.random() + this.describe,
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
        id: this.tasks[index].id,
        task: this.tasks[index].task,
        option: "conclude",
        conclude: true,
      });
      this.tasks.splice(index, 1);
    },
    deleteTask(index, to) {
      if (to === "tasks") {
        this.tasks.splice(index, 1);
      } else if (to === "conclude") {
        this.tasksConclude.splice(index, 1);
      }
    },
    modal({ target, pageX, pageY }) {
      console.log(target.id);
      this.active = !this.active;
      this.modalStyle = {
        position: "absolute",
        left: pageX - 200 + "px",
        top: pageY - 50 + "px",
      };
    },
  },
  created() {
    this.loadingLocalStorage();
  },
});
