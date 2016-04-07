# alexa-skills

### Getting started
Use the example directory as boilerplate for a new skill

### how to test
Make sure you have a `requests.js` file in your skill directory consisting of sample requests copied from the Amazon developer console, paired with functions that can confirm that the responses are valid.

`gulp test --skill=dirName`

Where `dirName` is the directory of your skill

### how to deploy
make sure your `~/.aws/credentials` file contains a default access key and secret access key with access to update your lambda functions
```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

`gulp deploy --skill=dirName --lambda=lambdaName`

Where `dirName` is the directory of your skill and `lambdaName` is the name of your lambda

### notes
Each skill directory has a `schema.txt` and `utterances.txt`. Those should be pasted into the interaction model fields when setting up the skill in the Amazon developer console.
