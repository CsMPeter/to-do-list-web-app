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

    }
};

ToDoList.getItems();