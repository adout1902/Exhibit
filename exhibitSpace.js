var exhibitSpace = {
    images: [],
    textboxes: [],
    other: [],
    //Method for adding images:
    addElement: function(elementType) {
      this.elementType.push({
        todoText: todoText,
        completed: false,
      });
    },


    //Method for deleting any items:
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    //Method for toggling a todo item as COMPLETED:
    toggleCompleted: function(position) {
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
   

  }
  
  //Button handlers:
  var handlers = {
    addImage: function() {
      images.addImage();
      //Clear the input
      addTodoText.value = "";
      view.displayTodos();
    },
    
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    },
    deleteAll: function(position) {
      todoList.todos.splice(position);
      view.displayTodos();
    },
    toggleCompleted: function(position) {
      var toggleCompletedInput = document.querySelector("#" + position + " toggleBtn");
      todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
      toggleCompletedInput.value = "";
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }
  };
  //Object that is used only to DISPLAY the items:
  var view = {
    displayTodos: function() {
      var todosUl = document.querySelector("ul");
      todosUl.innerHTML = '';
      for (var i = 0; i < todoList.todos.length; i++) {
  
        var todoLi = document.createElement("li");
        var todo = todoList.todos[i];
        todoLi.id = i;
        todoLi.textContent = todo.todoText;
        if (todo.completed === true) {
          todoLi.classList.toggle("checked");
        } else {
          todoLi.classList.toggle("notCompleted");
          todoLi.appendChild(this.createToggleButton());
        }
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
      }
    },
  
    createDeleteButton: function() {
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "DELETE";
      deleteButton.className = "deleteBtn";
      return deleteButton;
    },
    createToggleButton: function() {
      var toggleButton = document.createElement("button");
      toggleButton.textContent = "Completed";
      toggleButton.className = "toggleBtn";
      return toggleButton;
    },
    //
    setUpEventListeners: function() {
      var todosUl = document.querySelector("ul");
      todosUl.addEventListener("click", function(event) {
        var elementClicked = event.target;
        if (elementClicked.className === "deleteBtn") {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
  
        if (elementClicked.className === "toggleBtn") {
          todoList.toggleCompleted(parseInt(elementClicked.parentNode.id));
          view.displayTodos();
        }
      });
    }
  }
  
  view.setUpEventListeners();