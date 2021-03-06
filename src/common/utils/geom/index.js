import BoundingRect from 'common/geom/bounding-rect';

export function calculateBoundingRect(allRects) {
  const groupRect = {
    top    : Infinity,
    bottom : -Infinity,
    left   : Infinity,
    right  : -Infinity,
  };

  for (const rect of allRects) {
    groupRect.left   = Math.min(groupRect.left, rect.left);
    groupRect.right  = Math.max(groupRect.right, rect.right);
    groupRect.top    = Math.min(groupRect.top, rect.top);
    groupRect.bottom = Math.max(groupRect.bottom, rect.bottom);
  }

  return BoundingRect.create(groupRect);
}

export function boundsIntersect(r1, r2) {
  return Math.max(r1.left, r2.left) <= Math.min(r1.right, r2.right) &&
  Math.max(r1.top, r2.top) <= Math.min(r1.bottom, r2.bottom);
}
