import { module, test } from 'qunit';
import { setupTest } from '../../helpers';

module('Unit | Route | country-list', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:country-list');
    assert.ok(route);
  });
});
