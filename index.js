const inquirer = require("inquirer");
const fs = require("fs");

const manager = require('manager');

const engineer = require ("engineer");

const intern = require ("intern");

const generateHtml = require ('generateHtml.js')

const team = [];


const validInput = (userInput) => {

    if (userInput === "") {
        return "You need to type something to continue";}
    else {
        return true;
    }
};

const addManager= () => {
    return inquirer.prompt([

        {
            type: 'input',
            message: "What is the name of the manager? ",
            name: 'managerName',
            validate:validInput
        },
        {
            type: 'input',
            message: "What is the the id of the manager? ",
            name: 'managerId',
            validate:validInput
        },
        {
            type: 'input',
            message: "What is the office number of the team manager? ",
            name: 'managerOfficeNumber',
            validate:validInput
        },
        {
            type: 'input',
            message: "What is the email of the manager? ",
            name: 'managerEmail',
            validate:validInput
        },

    ])  .then(managerInput => {
        const  { managerName, managerId, managerOfficeNumber,  managerEmail } = managerInput; 
        const manager = new Manager (managerName, managerId, managerOfficeNumber, managerEmail);

        team.push(manager); 
        console.log(manager); 
    })
};
const addEmployee = () => {
    return inquirer
      .prompt([
        {
            type: 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
          type: "input",
          message: "What is the employee name?",
          name: "employeeName",
          validate: validInput
          
        },
        {
          type: "input",
          message: "What is the employee's Id?",
          name: "employeeId",
          validate: validInput
        },
        {
          type: "input",
          message: "What is the employee's Email?",
          name: "employeeEmail",
         validate: validInput
        },
        {
          type: "input",
          message: "What school is the intern from?",
          name: "internSchool",
          validate: validInput
          
        },
        {
          type: "input",
          message: "What is the engineer's gitHub username?",
          name: "engineerGitHubUsername",
          validate: validInput
        },
        {
            type: 'confirm',
            message: 'Do you want to add another team member?',
            name: 'confirmAddEmployee',
            default: false
        },
      ])
      .then(employeeInput => {
        // data for employee types 

        let { employeeName, employeeId, employeeEmail, role, engineerGitHubUsername, internSchool, confirmAddEmployee } = employeeInput; 
        let employee; 

        if (role === "Intern") {
            employee = new Intern (employeeName, employeeId, employeeEmail, internSchool);

            console.log(employee);

        } else if (role === "Engineer") {
            employee = new Engineer (employeeName, employeeId, employeeEmail, engineerGitHubUsername);
            
            console.log(employee);
        }

        team.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(team); 
        } else {
            return team;
        }
    })

};

const writeFile = data => {
    fs.writeFile('index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team has been generated successfully! Please check out the HTML")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(team => {
    return generateHTML(team);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });