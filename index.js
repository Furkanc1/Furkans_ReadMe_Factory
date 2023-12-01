// import ListPrompt from "inquirer/lib/prompts/list";

// TODO: Include packages needed for this application
const fs = require(`fs`);
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

const regxEmailValidation = (value) => {
    let rejexEmailValidationInner = value.match(
        /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
       );
        return rejexEmailValidationInner;
}
const vanillaJavaScriptEmailValidation = (value) => {
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
        name: `title`,
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
            return vanillaJavaScriptEmailValidation(value);
        },
    },
    {
        type: `input`,
        name: `username`,
        message: `What is your GitHub User Name?`
    },
    {
        type: 'input',
            message: 'Why did you build this project?',
            name: 'reasoning',
            default: `personal Use`,
        },
        {
            type: 'input',
            message: 'What problem does this project solve?',
            name: 'problem',
            default: `personal Problem`,
        },
        {
            type: 'input',
            message: 'Brief description of your Project for Repository.',
            name: 'description',
            default: `(insert description Here)`,
        },
        {
            type: `input`,
            name: `testing`,
            message: `Does this app need testing?`,
            default: `testing`
        },
        {
            type: `confirm`,
            name: `ifPreview`,
            message: `Do you have a valid link to either an Image, GIF, or vide of the Application?`,
            default: false
        },
        {
            type: `input`,
            name: `preview`,
            message: `Please enter Link of GIF, Image, or Video of Application`,
            // when" is a method if inquirer
            when(response) {
                return response.ifPreview == true;
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
            name: `license`,
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

    // TODO: Create a function to write README file
    const writeToFile = (fileName, template) => {
        fs.writeFile(fileName, template, (error => {
                error ? console.log(error) : console.log(`README Successfully Generated! You can find it within this folder!`);
            })
        )
    };
    
    const generateQuestions = () => {
        inquirer.prompt(questions).then((answers) => {
            console.log(`answers to questions:`, answers);
            let Template = generateMarkdown(answers);
            writeToFile(`generatedFromCodeReadMe.md`, Template);
            // user feedback for whatever
        }).catch((error) => {
            if (error.isTtyError) {
                console.log(`there was an issue rendering in current environment `);
            } else {
                console.log(`there was some other error`);
            };
        });
    }

// TODO: Create a function to initialize app
const init = () => {
    generateQuestions();
};

// Function call to initialize app
init();
