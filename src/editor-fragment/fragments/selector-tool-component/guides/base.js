import { create } from 'common/utils/class';

class BaseGuide {

  snap(left, top) {
    return { left, top };
  }

  intersects() {
    return false;
  }

  static create = create;
}

export default BaseGuide;
