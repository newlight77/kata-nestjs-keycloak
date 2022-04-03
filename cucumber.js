const options = [
  'test/features/*',
  '--require test/cucumber/usecases/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @ignore and @JobPosting"',
];

exports.profile = options.join(' ');

const optionsApi = [
  'test/features/*',
  '--require test/cucumber/api/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @ignore and @JobPosting"',
];

exports.profileApi = optionsApi.join(' ');
