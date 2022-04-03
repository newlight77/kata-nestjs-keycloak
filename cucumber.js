const options = [
  'test/features/*',
  '--require test/cucumber/usecases/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @ignore and @JobPosting"',
];

exports.profile = options.join(' ');

const optionsInterface = [
  'test/features/*',
  '--require test/cucumber/interface/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @ignore and @JobPosting"',
];

exports.profileInterface = optionsInterface.join(' ');
