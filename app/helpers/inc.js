import { helper } from '@ember/component/helper';

export function inc([number]) {
  return number + 1;
}

export default helper(inc);
