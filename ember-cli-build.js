const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // Import and merge the custom helpers
  const customHelpers = new Funnel('app', {
    files: ['helpers/if-equals.js', 'helpers/inc.js', 'helpers/dec.js','helpers/link-to.js'],
    destDir: 'helpers',
  });
  return MergeTrees([app.toTree(), customHelpers]);
};
