const vm = new Vue({
  el: "#app",
  data: {
    tasks: [],
    tasksConclude: [],
    describe: "",
    editCancel: false,
    option: "",
    modalStyle: {},
    itemEditable: "",
  },
  watch: {
    tasks() {
      window.localStorage.tasks = JSON.stringify(this.tasks);
    },
    tasksConclude() {
      window.localStorage.tasksConclude = JSON.stringify(this.tasksConclude);
    },
    editCancel() {
      this.loadingLocalStorage();
    },
    itemEditable() {
      this.editCancel = false;
    },
  },
  methods: {
    addTask() {
      if (this.describe && this.describe.length > 4 && this.option) {
        this.tasks.push({
          id: Math.random() + this.describe,
          task: this.describe,
          option: this.option,
          conclude: false,
        });
        this.describe = "";
        this.option = "";
      } else {
        alert(
          "Precisa selecionar uma opção e a tarefa ter mais de 4 caracteres!"
        );
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
      const alerta = confirm("Tem certeza que deseja deletar a tarefa ?");
      if (alerta) {
        if (to === "tasks") {
          this.tasks.splice(index, 1);
        } else if (to === "conclude") {
          this.tasksConclude.splice(index, 1);
        }
      }
    },
    edit(index) {
      this.itemEditable = index;
    },
    cancel() {
      this.editCancel = true;
      this.itemEditable = "";
    },
    save(index, task) {
      if (task.length > 4) {
        if (!this.editCancel) {
          this.tasks[index].task = task;
          window.localStorage.tasks = JSON.stringify(this.tasks);
          this.itemEditable = "";
        }
      } else {
        alert("Precisa haver mais de 4 caracteres");
      }
    },
  },
  created() {
    this.loadingLocalStorage();
  },
});
