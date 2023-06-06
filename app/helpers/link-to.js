import { helper } from '@ember/component/helper';

export function linkToHelper([routeName, model], options) {
  return {
    route: routeName,
    model,
    options: options.hash,
  };
}

export default helper(linkToHelper);
