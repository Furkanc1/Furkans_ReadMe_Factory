// TODO: Include packages needed for this application
const inquirer = require(`inquirer`);
const generateMarkdown = require(`./Develop/utils/generateMarkdown`);

//const fututre const here


// TODO: Create an array of questions for user input
const questions = [
        {
            type: 'input',
            message: 'What is your RepositoryName?',
            name: `(userRepoName)`,
            default: `User Repo Name`,
        },
        {
            type: 'input',
            message: 'Why did you build this project?',
            name: 'Reasoning...',
            default: `Personal Use`,
        },
        {
            type: 'input',
            message: 'What problem does this project solve?',
            name: 'Problem...',
            default: `Personal Problem`,
        },
        {
            type: 'input',
            message: 'Brief description of your Project for Repository.',
            name: 'Description',
            default: `(insert description Here)`,
        },
        {
            type: `list`,
            name: `License`,
            message: `What is your repositories License`,
            choices: [
                `MIT`, 
                `GPL`, 
                `Apache`, 
                `BSD`, 
                `CDDL`, 
                `other`
            ],
            default: 1,
        },
        {

        }
];

const generalQuestions = () => {
    inquirer.prompt(questions).then((answers) => {
        console.log(`answers to questions:`, answers);
    // user feedback for whatever
    }).catch((error) => {
        if (error.isTtyError) {
                console.log(`there was an issue rendering in current environment `);
        } else {
            
        };
    });
}

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    
};

// TODO: Create a function to initialize app
const init = () => {
    generalQuestions();
};

// Function call to initialize app
init();
