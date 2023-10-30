// import ListPrompt from "inquirer/lib/prompts/list";

// TODO: Include packages needed for this application
const inquirer = require(`inquirer`);
const generateMarkdown = require(`./Develop/utils/generateMarkdown`);

 const licenses = {
    none: `none`, 
    MIT: `MIT`,
    GPL: `GPL`,
    Apache: `Apache`,  
    BSD: `BSD`,
    CDDL: `CDDL`,
}

//const fututre const here

const rejexEmailValidation = (value) => {
    let rejexEmailValidationInner = value.match(
        /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
       );
        return rejexEmailValidationInner;
}
const vanillaJavaScriptValidation = (value) => {
    const validDomains = [ 
        `com`, 
        `org`, 
        `gov`, 
        `edu`
    ];
    // .split returns an array
    // .includes returns true or false (boolean)
        let emailAT = value.includes(`@`);
        if (emailAT == true) {
            let emailWebsite = value.split(`@`)[1];
            let emailDomain = emailWebsite.split(`.`)[1];
            let emailHasValidDomain = validDomains.includes(emailDomain);
            return value != `` && emailHasValidDomain == true ? true : errorString;
        } else {
            return `enter valid email`;
        }
}



// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your RepositoryName?',
        name: `(userRepoName)`,
        default: `User Repo Name`,
    },
    // githubUserName + githubEmail
    {
        type: `input`,
        name: `githubEmail`,
        message: `What is your GitHub Email Address?`,
        filter(value) {
            return value.toLowerCase();
        },
            validate(value) {
                const validDomains = [ 
                    `com`, 
                    `org`, 
                    `gov`, 
                    `edu`
                ];
                 // .split returns an array
                  // .includes returns true or false (boolean)
                    let emailAT = value.includes(`@`);
                    if (emailAT == true) {
                        let emailWebsite = value.split(`@`)[1];
                        let emailDomain = emailWebsite.split(`.`)[1];
                        let emailHasValidDomain = validDomains.includes(emailDomain);
                        return value != `` && emailHasValidDomain == true ? true : errorString;
                    } else {
                        return `enter valid email`;
                    }
            },
    },
    {
        type: `input`,
        name: `UserName`,
        message: `What is your GitHub User Name?`
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
            type: `input`,
            name: `App_Based question`,
            message: `Does this app need testing?`,
            default: ``
        },
        {
            type: `input`,
            name: `Installation Process`,
            message: `What are the installation instructions?`,
            default: ``
        },
        {
            type: `confirm`,
            name: `preview?`,
            message: `Do you have a valid link to either an Image, GIF, or vide of the Application?`,
            default: false
        },
        {
            type: `input`,
            name: `preview`,
            message: `Please enter Link of GIF, Image, or Video of Application`,
            // when" is a method if inquirer
            when(response) {
                return response.preview == true;
            }
        },
        {
            type: `input`,
            name: `installation`,
            message: `What are the installation instrutions for your application?`,
            default: `NPM Install`
        },
        {
            type: `input`,
            name: `usage`,
            message: `How do you Test / Run your application`,
            default: `Using Node.Js`
        },
        {
            type: `list`,
            name: `License`,
            message: `What is your repositories License`,
            choices: [
                licenses.none,
                licenses.MIT, 
                licenses.GPL, 
                licenses.Apache, 
                licenses.BSD, 
                licenses.CDDL, 
            ],
            default: 1,
        },
    ];

    const generalQuestions = () => {
        inquirer.prompt(questions).then((answers) => {
            console.log(`answers to questions:`, answers);
            let generatedMarkdownTemplate = generateMarkdown(answers);
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
    FileSystem.writeFile(`GeneratedREADME.md`, generateMarkdown)
};

// TODO: Create a function to initialize app
const init = () => {
    generalQuestions();
};

// Function call to initialize app
init();
