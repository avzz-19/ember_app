import { helper } from '@ember/component/helper';

export function ifEquals(params) {
  const [arg1, arg2] = params;
  return arg1 === arg2;
}

export default helper(ifEquals);
