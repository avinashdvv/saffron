import create from 'common/utils/class/create';
import getPath from 'common/utils/node/get-path';
import getNode from 'common/utils/node/get-node';

/**
 */

class Marker {
  constructor(path, nodeFactory) {
    this._path = path;
    this._nodeFactory = nodeFactory;
  }

  getNode(rootNode) {
    return getNode(rootNode, this._path);
  }

  createSection(rootNode) {
    return new NodeSection(this.getNode(rootNode), this._nodeFactory);
  }
}

/**
 * a section is a group of nodes contained within a
 */

export default class NodeSection {

  constructor(target, nodeFactory = document) {
    this._target      = target;
    this._nodeFactory = nodeFactory;
  }

  appendChild(child) {
    this._target.appendChild(child);
  }

  toString() {
    return this._target.outerHTML || this._target.nodeValue;
  }

  get targetNode() {
    return this._target;
  }

  set targetNode(value) {
    this.remove();
    this._target = value;
  }

  get visible() {
    return !this._placeholderNode;
  }

  get childNodes() {
    return this._target.childNodes;
  }

  get innerHTML() {
    return this._target.innerHTML;
  }

  toFragment() {
    return this._target;
  }

  /**
   * remove the section completely
   */

  remove() {
    var parent = this._nodeFactory.createElement('div');
    parent.appendChild(this._target);
  }

  /**
   * hides the section, but maintains the section position
   */

  hide() {
    if (this._placeholderNode) return;
    this._placeholderNode = this._nodeFactory.createTextNode('');
    this._target.parentNode.insertBefore(this._target, this._placeholderNode);
    this.remove();
  }

  /**
   * shows the section if it's hidden
   */

  show() {
    if (!this._placeholderNode) return;
    var placeholderNode = this._placeholderNode;
    this._placeholderNode = void 0;
    placeholderNode.parentNode.insertBefore(this._target, placeholderNode);
    placeholderNode.parentNode.removeChild(placeholderNode);
  }

  /**
   */

  createMarker() {
    return new Marker(getPath(this._target));
  }

  /**
   */

  clone() {
    return new NodeSection(this.targetNode.cloneNode(true), this._nodeFactory);
  }

  static create = create;
}
