const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const team = [];

// Create Manager: ask questions to populate manager
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
        name: "managerId",
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
    ])
    .then((response) => {
      console.log(response);

      // create a new Manager Object from Manager Classs
      const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerNumber);
      // push manager onto team[]
      team.push(manager);

      // create team
      createTeam();
    });
}

// Create Engineer
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
        name: "engineerId",
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
      const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
      team.push(engineer);
      createTeam();
    });
}

// Create Intern
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
        name: "internId",
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
    ])
    .then((response) => {
      console.log(response);
      const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
      team.push(intern);

      createTeam();
    });
}

// Create Team: Will continue to loop until user selects "Finish"
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

// Generate HTML code
const generateHTML = (team) => {
  // Create manager template
  const managerTemplate = `<div class="manager-card">
<h3 class="employee-name">${team[0].getName()}</h3>
<h4 class="title">Manager</h4>
<div>${team[0].getId()}</div>
<div><a href="mailto:${team[0].getEmail()}">${team[0].getEmail()}</a></div>
<div>${team[0].getOffice()}</div>
</div>`;

  // create engineer template
  const engineers = team.filter((employee) => employee.getRole() === "Engineer");
  let engineerTemplate = "";
  engineers.forEach((engineer) => {
    engineerTemplate += `<div class="engineer-card">
<h3 class="employee-name">${engineer.getName()}</h3>
<h4 class="title">Engineer</h4>
<div>${engineer.getId()}</div>
<div><a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></div>
<div><a href="https://github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></div>
</div>`;
  });

  // create intern template
  const interns = team.filter((employee) => employee.getRole() === "Intern");
  let internTemplate = "";
  interns.forEach((intern) => {
    internTemplate += `<div class="intern-card">
<h3 class="employee-name">${intern.getName()}</h3>
<h4 class="title">Intern</h4>
<div>${intern.getId()}</div>
<div><a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></div>
<div>${intern.getSchool()}</div>
</div>`;
  });

  // create document and add team templates to html document (team.html)
  const document = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Team Profile Generator</title>
</head>
<body>
<h1 class="heading">Team Profile</h1>
${managerTemplate}
<div class="employee-wrapper">
${engineerTemplate}
${internTemplate}
</div>
</body>
</html>`;

  return document;
};

createManager();
