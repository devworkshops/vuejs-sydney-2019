Vue.filter("friendly-date", date => {
    var diff = new Date() - date;
    if (diff < 1000) return "Just now";
    if (diff < 60000) return `${Math.floor(diff / 1000)} seconds ago`;
    if (diff < 60000 * 60) return `${Math.floor(diff / 60000)} minutes ago`;
    return "Too long ago";
});

Vue.component("add-item", {
    template: `
          <form class="mb-2" v-on:submit.prevent="add">
              <input
              class="form-control"
              placeholder="Add todo..."
              v-model="newTodo" />
          </form>
            `,
    data() {
        return {
            newTodo: undefined
        };
    },
    methods: {
        add() {
            this.$emit("submitted", this.newTodo);
            this.newTodo = undefined;
        }
    }
});

Vue.component("remaining-items", {
    props: ["remaining"],
    template: `
    <div class="alert alert-danger" v-if="remaining>10">
    <slot name='danger'>You've got a long day ahead of you!!!</slot>
  </div>
  <div class="alert alert-secondary" v-else-if="remaining>0">
    {{ remaining }} item(s) remaining.
  </div>
  <div class="alert alert-success" v-else>
    <slot name='success'>Hooray!!! You're all done, go to the beach!!!</slot>
  </div>`
});

var app = new Vue({
    el: '#app',
    data: {
        title: 'Hello, World!',
        todos: [],
        nextId: 5,
        newTodoTitle: null,
        filters: ["All", "Todo", "Done"],
        activeFilter: 'All',
    },
    methods: {
        addTodo(todo) {
            this.todos.push({
                id: this.nextId++,
                title: todo,
                created: new Date(),
                done: false
            });
        }
    },
    computed: {
        filteredTodos() {
            if (this.activeFilter === "All") {
                return this.todos;
            }

            if (this.activeFilter === "Todo") {
                return this.todos.filter(t => !t.done);
            }

            if (this.activeFilter === "Done") {
                return this.todos.filter(t => t.done);
            }
        },
        notDoneCount() {
            return this.todos.filter(t => !t.done).length
        }
    },
    created() {
        this.todos = [
            { id: 1, title: "Do this thing.", done: false, created: new Date(2019, 1, 1) },
            { id: 2, title: "Do another thing.", done: false, created: new Date(2019, 3, 1) },
            { id: 3, title: "Do many, many things!", done: false, created: new Date() },
            { id: 4, title: "This thing is done.", done: true, created: new Date() }
        ]
    }
})