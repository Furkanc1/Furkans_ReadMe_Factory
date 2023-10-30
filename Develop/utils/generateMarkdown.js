// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(licenseName) {
  let extraStuffAtTheEnd = ``;
  if (licenseName == `BSD`) extraStuffAtTheEnd = `-3-Clause`;
  else if (licenseName == `GPL`) extraStuffAtTheEnd = `-3.0`;
  else if (licenseName = `Apache`) extraStuffAtTheEnd = `-2.0`;
  let licenseLink = `https://opensouce.org/licenses/${licenseName}${extraStuffAtTheEnd}`;
  return licenseLink;
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

// const { licenses } = require(`../..`);
const { licenseTexts } = require(`../utils/licenseTexts`);

function renderLicenseBadge(license) {
  let licenseName = license.split(``)[0];
  let licenseBadge = `[![License Badge: ${licenseName}](https://img.shields.io/badge/License-${licenseName}-blue.svg)](${renderLicenseLink(licenseName)})`;
    return licenseBadge;
};


// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(licenseName) {
  // render license section
  return licenseTexts[licenseName];
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(answers) {
  // destructure variables from object
  let { title, email, username, description, license } = answers;

  let licenseName = license.split(``)[0];

  let generatedTemplate = `
    # ${ title }

    ${ renderLicenseBadge(license) }

    ${ description }

    ${ preview == true ? `[Preview Application](${preview})` : `` }

    ## Table of Contents (Optional)

    [Installation](#installation)
    [Usage](#usage)
    [Questions](#questions)
    [Credits](#credits)
    [License](#license)

    ## Installation
    ### Run the command ${installation} to Install

    # Usage 
    #### Use ${usage} CLI (Command Line Interface) to run this application!

    ## Licensing
    ${renderLicenseBadge(license)}
    #### ${renderLicenseSection(licenseName)}
    #### ${renderLicenseLink(licenseName)}

    ## Questions
    #### Github Profile: [*${username}*](https://github.com/${username})
    #### Contact me or ask me questions at [${email}](mailto:${email}).
    `;
    return generatedTemplate;
};

module.exports = generateMarkdown;
