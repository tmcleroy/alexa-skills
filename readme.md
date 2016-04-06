# alexa-skills

### how to test
make sure you have a `request.json` file in your skill directory consisting of sample requests copied from the Amazon developer console.

`gulp test --skill=dirName`

where `dirName` is the directory of your skill

### how to deploy
`gulp deploy --skill=dirName --lambda=lambdaName`

where `dirName` is the directory of your skill and `lambdaName` is the name of your lambda

### notes
Each skill directory has a `schema.txt` and `utterances.txt`. Those should be pasted into the interaction model fields when setting up the skill in the Amazon developer console.
