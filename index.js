const inquirer = require("inquirer");
const fs = require("fs");
const team = [];

// Create Manager
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter team manager's name",
        name: "managerName",
      },
      {
        type: "input",
        message: "Enter team manager's employee ID",
        name: "managerID",
      },
      {
        type: "input",
        message: "Enter team manager's email address",
        name: "managerEmail",
      },
      {
        type: "input",
        message: "Enter team manager's office number",
        name: "managerNumber",
      },
      //   {
      //     type: "list",
      //     message: "Add Engineer, Intern, or Finish?",
      //     name: "mainMenu",
      //     choices: ["Engineer", "Intern", "Finish"],
      //   },
    ])
    .then((response) => {
      console.log(response);

      // Create a new Manager Object from Manager Classs
      // push manager onto Team[]

      createTeam();

      //   const parseHTML = generateHTML(response);

      // Write to File
      //   fs.writeFile("team.html", parseHTML, (err) => (err ? console.error(err) : console.log("Success!")));
    });
}

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Add Engineer, Intern, or Finish?",
        name: "mainMenu",
        choices: ["Engineer", "Intern", "Finish"],
      },
    ])
    .then((response) => {
      //   console.log(response);
      if (response.mainMenu === "Engineer") {
        createEngineer();
      } else if (response.mainMenu === "Intern") {
        createIntern();
      } else {
        const parseHTML = generateHTML(team);
        fs.writeFile("team.html", parseHTML, (err) => (err ? console.error(err) : console.log("Success!")));
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Engineer's name",
        name: "engineerName",
      },
      {
        type: "input",
        message: "Enter Engineer's employee ID",
        name: "engineerID",
      },
      {
        type: "input",
        message: "Enter Engineer's email address",
        name: "engineerEmail",
      },
      {
        type: "input",
        message: "Enter Engineer's GitHub",
        name: "engineerGithub",
      },
    ])
    .then((response) => {
      console.log(response);
      createTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Intern's name",
        name: "internName",
      },
      {
        type: "input",
        message: "Enter Interns's ID",
        name: "internID",
      },
      {
        type: "input",
        message: "Enter Intern's email address",
        name: "internEmail",
      },
      {
        type: "input",
        message: "Enter Intern's school",
        name: "internSchool",
      },
      //   {
      //     type: "list",
      //     message: "Add Engineer, Intern, or Finish?",
      //     name: "mainMenu",
      //     choices: ["Engineer", "Intern", "Finish"],
      //   },
    ])
    .then((response) => {
      console.log(response);

      // Create a new Manager Object from Manager Classs
      // push manager onto Team[]

      createTeam();

      //   const parseHTML = generateHTML(response);

      // Write to File
      //   fs.writeFile("team.html", parseHTML, (err) => (err ? console.error(err) : console.log("Success!")));
    });
}

// Generate HTML code
const generateHTML = (team) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile Generator</title>
</head>
<body>
    <div>${managerName}</div>
    <div>${managerID}</div>
    <div>${managerEmail}</div>
    <div>${managerNumber}</div>
</body>
</html>`;

createManager();
// 1. Manager: manager name, employee ID, email address, office number
// Ask questions to populate HTML code

// 2. presented with menu to add: Engineer, Intern, or Finish

// 2a. Select Engineer: engineer name, ID, email, GitHub username
// back to menu

// 2b. Select Intern: intern's name, ID, email, school
// back to menu

// 2c. Finish: exit application, HTML is generated

// Generate HTML File
