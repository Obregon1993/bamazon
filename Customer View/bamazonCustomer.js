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
function updateProduct(idProduct,newAmount, price, sold) {
    
    connection.query(
     "UPDATE products SET ? WHERE ?",
     [
       {
         stock_quantity: newAmount
       },
       {
         id:idProduct
       }
     ],
     function(err, res) {
       if (err) throw err;
       console.log(`Total cost is ${(price*sold*0.07)+(price*sold)}`);
       
       connection.end();
     }
     
   );
 
   
 }
//-------------------------------------------------------
function readProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`ITEM ID     PRODUCT NAME                           DEPARTMENT NAME     PRICE     STOCK QUANTITY
-------     ----------------------------------     ---------------     -----     --------------`)


        console.log(`${res[0].id}           ${res[0].product_name}                            ${res[0].department_name}         ${res[0].price}        ${res[0].stock_quantity}`)
        console.log(`${res[1].id}           ${res[1].product_name}                                   ${res[1].department_name}         ${res[1].price}        ${res[1].stock_quantity}`)
        console.log(`${res[2].id}           ${res[2].product_name}                         ${res[2].department_name}      ${res[0].price}        ${res[2].stock_quantity}`)
        console.log(`${res[3].id}           ${res[3].product_name}                            ${res[3].department_name}             ${res[3].price}        ${res[3].stock_quantity}`)
        console.log(`${res[4].id}           ${res[4].product_name}                       ${res[4].department_name}             ${res[4].price}        ${res[4].stock_quantity}`)
        console.log(`${res[5].id}           ${res[5].product_name}                         ${res[5].department_name}         ${res[5].price}        ${res[5].stock_quantity}`)
        console.log(`${res[6].id}           ${res[6].product_name}     ${res[6].department_name}               ${res[6].price}        ${res[6].stock_quantity}`)
        console.log(`${res[7].id}           ${res[7].product_name}                     ${res[7].department_name}               ${res[7].price}        ${res[7].stock_quantity}`)
        console.log(`${res[8].id}           ${res[8].product_name}                               ${res[8].department_name}         ${res[8].price}        ${res[8].stock_quantity}`)
        console.log(`${res[9].id}          ${res[9].product_name}                                ${res[9].department_name}         ${res[9].price}        ${res[9].stock_quantity}`)

        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is the id of the product that you would like to buy?",
                    name: "id"
                },

                {
                    type: "input",
                    message: "How many products would you loke to buy",
                    name: "quantity"
                },
 
            ])
            .then(function (inquirerResponse) {
    
                var productSelected=res[inquirerResponse.id-1]
                //   console.log("\nthe id is " + inquirerResponse.id);
                //   console.log("Your quantity " + inquirerResponse.quantity );
                if(inquirerResponse.quantity<=productSelected.stock_quantity&&inquirerResponse.quantity>0){
                    console.log("yes we can process the sale")
                    updateProduct(productSelected.id, productSelected.stock_quantity-inquirerResponse.quantity, parseInt(productSelected.price), inquirerResponse.quantity);
                }else{
                    console.log("out of stock or wrong value")
                }
               
            });
        
    });
    
}
