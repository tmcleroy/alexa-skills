'use strict';
const _ = require('lodash');
const gulp = require('gulp');
const lambda = require('gulp-awslambda');
const zip = require('gulp-zip');
const util = require('gulp-util');
const path = require('path');
const Promise = require('bluebird');

gulp.task('deploy', () => {
  const skill = util.env.skill;
  const lambdaName = util.env.lambda;

	return gulp.src('**', { cwd: path.join(process.cwd(), skill)})
		.pipe(zip('bundle.zip'))
		.pipe(lambda(lambdaName, { region: 'us-east-1' }));
});

gulp.task('test', (done) => {
  const skill = util.env.skill;
  const verbose = util.env.verbose;
  const lambda = require(path.join(process.cwd(), skill, 'index.js')).handler;
  const requests = require(path.join(process.cwd(), skill, 'requests.js'));
  const promises = [];

  requests.forEach(req => {
    promises.push(new Promise((resolve, reject) => {
      const context = {
        succeed: data => {
          if (verbose) {
            console.log('**** SUCCESS ****');
            console.log(data);
          }
          if (req.test(data)) {
            resolve();
          } else {
            throw new util.PluginError('test', 'A test returned successfully but failed your response correctness test');
            reject();
          }
        },
        fail: data => {
          if (verbose) {
            console.log('**** FAILURE ****');
            console.log(data);
          }
          throw new util.PluginError('test', 'A test failed to return successfully');
          reject();
        }
      };
      lambda(req.request, context);
    }));
  });

  Promise.all(promises).then(() => {
    _.delay(done, 200);
  });
});
