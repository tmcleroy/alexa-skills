const gulp = require('gulp');
const lambda = require('gulp-awslambda');
const zip = require('gulp-zip');
const util = require('gulp-util');
const path = require('path');

gulp.task('deploy', () => {
  const skill = util.env.skill;
  const lambdaName = util.env.lambda;

  console.log(`deploying skill: ${skill} to lambda: ${lambdaName}`);
	return gulp.src('**', { cwd: path.join(process.cwd(), skill)})
		.pipe(zip('bundle.zip'))
		.pipe(lambda(lambdaName, { region: 'us-east-1' }));
});
