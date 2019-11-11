window.ToDoList = {

    API_URL: "http://localhost:8081/to-do-items",

    getItems: function () {
        $.ajax({
            url: ToDoList.API_URL,
            method: "GET"
        }).done(function (response) {
            console.log("GET done");
            console.log(response);

            ToDoList.displayIems(JSON.parse(response));
        });
    },

    displayIems: function (items) {
        var tableContent = "";

        items.forEach(item => tableContent +=  ToDoList.getItemTableRow(item));

        $("#to-do-items tbody").html(tableContent);


    },

    createItem: function () {

        let descriptionValue = $("#description-field").val();
        let deadlineValue = $("#deadline-field").val();
        var requestBody = {
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_URL,
            method: "POST",
            // MIME type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            ToDoList.getItems();
        })
    },

    markItemDone: function (id,done) {
      let requestBody = {
          done: done
      };

      $.ajax({
        url: ToDoList.API_URL + "?id=" + id,
        method: "PUT",
        contentType: "application.json",
        data: JSON.stringify(requestBody)
      }).done(function () {
          ToDoList.getItems();

      })
    },

    deleteItem:function (id) {

        $.ajax({
            url: ToDoList.API_URL + "?id=" + id,
            method: "DELETE",
        }).done(function () {
            ToDoList.getItems();

        })
    },

    getItemTableRow: function (item) {
        var deadline = new Date(...item.deadline).toLocaleDateString("en");

        // ternary operator
        var checkedAttribute = item.done ? "checked" : "";

         return ` <tr>
            <td>${item.description}</td>
            <td>${deadline}</td>
            <td><input type="checkbox" class="mark-done" data-id="${item.id}" ${checkedAttribute}/></td>
            <td><a href="#" class="delete-item" data-id="${item.id}><i class="far fa-trash-alt"></i></a></td>
        </tr>`;

    },

    bindEvents: function () {
        $("#create-item-form").submit(function (event){
            event.preventDefault();
            ToDoList.createItem();
        });

        $("#to-do-items").delegate(".mark-done","change",function (event) {
            event.preventDefault();

            let id = $(this).data("id");
            let checked = $(this).is("checked");

            ToDoList.markItemDone(id,checked);

        })

    }

};

ToDoList.getItems();
ToDoList.bindEvents();
ToDoList.markItemDone();