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

    supervisorOptions()
});
//-----------------------------------------------------------
function viewSales(params) {
    

        connection.query(
            `SELECT
            d.department_id, d.department_name, d.over_head_costs, p.product_sales, d.over_head_costs - p.product_sales as  total_profit
            FROM  departments d
            JOIN products p
            ON d.department_name = p.department_name
            GROUP BY d.department_name`,
            
            function (err, res) {
                if (err) throw err;
               console.table(res)
    
               connection.end();
            }
            
        );
    
    
    
}
//-----------------------------------------------------------
function createDep() {
    inquirer
  .prompt([
    
    {
      type: "input",
      message: "Department's name?",
      name: "name"
    },
    {
        type: "input",
        message: "Department's over head cost?",
        name: "cost"
      }
  ])
  .then(function(inquirerResponse) {
    const query = connection.query(
        "INSERT INTO departments SET ?",
        {
          
          department_name:inquirerResponse.name,
          over_head_costs: inquirerResponse.cost
          
        },
        function(err, res) {
          if (err) throw err;
          console.log("Department added succesfully!");
          
          connection.end();
        }
      );
  });
}


function supervisorOptions(params) {
    inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
        type: "list",
        message: "Select option",
        choices: ["View Product Sales by Department", "Create New Department", ],
        name: "options"
    },
])
.then(function(inquirerResponse) {
  
  (inquirerResponse.options==="View Product Sales by Department")?viewSales():createDep();

 
});

}