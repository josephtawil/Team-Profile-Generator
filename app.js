const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var id = 0;
const employeeArray = [];

const createEmployee = () => {
    inquirer.prompt(
        [
        {
            type:"list",
            name: "Role",
            message: "What type of role do you want to create",
            choices: ["Engineer", "Manager", "Intern"]
        },
        {
            type:"input",
            name: "name", 
            message: "What is your name?",
        },
            {
                type:"input",
            name: "email",
            message: "What is your email"
            },
            {
                type:"input",
            name: "officenumber",
            message: "What is your office number",
            when: (answers) => answers.Role === "Manager"
            },
            {
                type: "input",
                name: "github", 
                message: "What is your github",
                when: (answers) => answers.Role === "Engineer"
            },
            {
                type: "input",
                name: "school",
                message: "What is the school you got to",
                when: (answers) => answers.Role === "Intern"
            }
            ]).then((answers)=>{
                if(answers.Role === "Manager"){
                    employeeArray.push(new Manager(answers.name, answers.email, id, answers.officenumber));
                    id++;
                }
                else if(answers.Role === "Engineer"){
                    employeeArray.push(new Engineer(answers.name, answers.email, id, answers.github));
                    id++;
                }
                else if(answers.Role === "Intern"){
                    employeeArray.push(new Intern(answers.name, answers.email, id, answers.school));
                    id++;
                }
                
                inquirer.prompt({
                    type: "confirm",
                    name: "anotherone",
                    message: "Add another employee?",
                }).then((res)=>{
                    if(res.anotherone === true){
                        createEmployee();
                    }
                    else{
                       const employees = render(employeeArray);
                       fs.writeFile("./output/team.html", employees, (err) => {
                           if(err) throw err;
                           console.log("Successfully added employee");
                       })
                    };
                })
                

    }).catch(error=>{
        console.log(error);
    });
}

createEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
