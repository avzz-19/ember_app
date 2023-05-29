import { helper } from '@ember/component/helper';

export function dec([number]) {
  return number - 1;
}

export default helper(dec);
