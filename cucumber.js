const options = [
  'test/features/*',
  '--require test/features/steps/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and @component"',
];

exports.profile = options.join(' ');

const optionsApi = [
  'test/features/*',
  '--require test/features/api/*.ts',
  '--require-module ts-node/register',
  'cucumber-js -f @cucumber/pretty-formatter',
  '--tags "not @wip and @api"',
];

exports.profileApi = optionsApi.join(' ');
