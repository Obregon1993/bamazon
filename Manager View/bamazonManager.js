const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Eyda2019",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;

    readProducts();
});
//-----------------------------------------------------------------
function updateProduct(idProduct, newAmount) {

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newAmount
            },
            {
                id: idProduct
            }
        ],
        function (err, res) {
            if (err) throw err;
           console.log("quantity added")

           connection.end();
        }
        
    );


}
//------------------------------------------------------
function lowInventory(arrayProducts) {
    for (let index = 0; index < arrayProducts.length; index++) {
        if (arrayProducts[index].stock_quantity <= 5) {
            console.log(`product: ${arrayProducts[index].product_name}----------   ${arrayProducts[index].stock_quantity}`)
        }

    }connection.end();
}
//-------------------------------------------------------
function addToInventary(arrayProduct) {
    showProducts(arrayProduct);
    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is the id of the product that you would like to increase?",
        name: "id"
    },

    {
        type: "input",
        message: "How many products would you like to add",
        name: "quantity"
    },
    ])
    .then(function(inquirerResponse) {
      // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
      updateProduct(inquirerResponse.id,arrayProduct[inquirerResponse.id-1].stock_quantity+parseInt(inquirerResponse.quantity));
      
    });
  
}
//-------------------------------------------------------
function showProducts(arrayProduct) {
    console.log(`ITEM ID     PRODUCT NAME                           DEPARTMENT NAME     PRICE     STOCK QUANTITY
-------     ----------------------------------     ---------------     -----     --------------`)


    console.log(`${arrayProduct[0].id}           ${arrayProduct[0].product_name}                            ${arrayProduct[0].department_name}         ${arrayProduct[0].price}        ${arrayProduct[0].stock_quantity}`)
    console.log(`${arrayProduct[1].id}           ${arrayProduct[1].product_name}                                   ${arrayProduct[1].department_name}         ${arrayProduct[1].price}        ${arrayProduct[1].stock_quantity}`)
    console.log(`${arrayProduct[2].id}           ${arrayProduct[2].product_name}                         ${arrayProduct[2].department_name}      ${arrayProduct[0].price}        ${arrayProduct[2].stock_quantity}`)
    console.log(`${arrayProduct[3].id}           ${arrayProduct[3].product_name}                            ${arrayProduct[3].department_name}             ${arrayProduct[3].price}        ${arrayProduct[3].stock_quantity}`)
    console.log(`${arrayProduct[4].id}           ${arrayProduct[4].product_name}                       ${arrayProduct[4].department_name}             ${arrayProduct[4].price}        ${arrayProduct[4].stock_quantity}`)
    console.log(`${arrayProduct[5].id}           ${arrayProduct[5].product_name}                         ${arrayProduct[5].department_name}         ${arrayProduct[5].price}        ${arrayProduct[5].stock_quantity}`)
    console.log(`${arrayProduct[6].id}           ${arrayProduct[6].product_name}     ${arrayProduct[6].department_name}               ${arrayProduct[6].price}        ${arrayProduct[6].stock_quantity}`)
    console.log(`${arrayProduct[7].id}           ${arrayProduct[7].product_name}                     ${arrayProduct[7].department_name}               ${arrayProduct[7].price}        ${arrayProduct[7].stock_quantity}`)
    console.log(`${arrayProduct[8].id}           ${arrayProduct[8].product_name}                               ${arrayProduct[8].department_name}         ${arrayProduct[8].price}        ${arrayProduct[8].stock_quantity}`)
    console.log(`${arrayProduct[9].id}          ${arrayProduct[9].product_name}                                ${arrayProduct[9].department_name}         ${arrayProduct[9].price}        ${arrayProduct[9].stock_quantity}`)
    
}
//-------------------------------------------------------
function readProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;



        inquirer
            .prompt([

                {
                    type: "list",
                    message: "Manager options",
                    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                    name: "managerChoices"
                }



            ])
            .then(function (inquirerResponse) {

                
                if (inquirerResponse.managerChoices === "View Products for Sale") {
                    showProducts(res);
                    connection.end();
                } else if (inquirerResponse.managerChoices === "View Low Inventory") {
                    lowInventory(res);
                } else if (inquirerResponse.managerChoices === "Add to Inventory") {
                    addToInventary(res);
                }

            });

    });
    
}
