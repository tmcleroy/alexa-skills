# alexa-skills

### Getting started
Use the example directory as boilerplate for a new skill

### how to test
Make sure you have a `requests.js` file in your skill directory consisting of sample requests copied from the Amazon developer console, paired with functions that can confirm that the responses are valid.

`gulp test --skill=dirName`

Where `dirName` is the directory of your skill

### how to deploy
`gulp deploy --skill=dirName --lambda=lambdaName`

Where `dirName` is the directory of your skill and `lambdaName` is the name of your lambda

### notes
Each skill directory has a `schema.txt` and `utterances.txt`. Those should be pasted into the interaction model fields when setting up the skill in the Amazon developer console.
