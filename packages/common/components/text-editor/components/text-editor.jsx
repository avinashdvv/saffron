import './text-editor.scss';

import React from 'react';
import TextEditor from '../controllers/text-editor';
import TypeNotifier from 'common/notifiers/type';
import LineComponent from './line';
import CaretComponent from './caret';
import CollectionNotifier from 'common/notifiers/collection';
import HighlightComponent from './highlight';

class TextEditorComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      focus : false,
      idle  : true
    };

    this.notifier = CollectionNotifier.create();
    this.notifier.push(this);
  }

  notify(message) {

    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.setState({ idle: false });
    }, 10);

    clearTimeout(this._idleTimer);
    this._idleTimer = setTimeout(() => {
      this.setState({ idle: true });
    }, 100);

    if (message.type === 'sourceChange') {
      if (this.props.onChange) {
        this.props.onChange(message.source);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getEditor().setProperties(nextProps);
  }

  getEditor() {
    if (this._editor) return this._editor;

    this._editor = TextEditor.create({
      notifier: this.notifier,
      ...this.props
    });

    return this.getEditor();
  }

  onKey(event) {
    this.notifier.notify({
      type: 'input',
      text: String.fromCharCode(event.which),
      preventDefault() {
        event.preventDefault();
      }
    });
  }

  onKeyCommand(event) {


    this.notifier.notify({
      type    : 'keyCommand',
      keyCode : event.keyCode,
      altKey  : event.altKey,
      ctrlKey : event.ctrlKey,
      cmdKey  : event.cmdKey,
      metaKey : event.metaKey,
      preventDefault() {
        event.preventDefault();
      }
    });

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  onFocus(event) {
    this.setState({ focus: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  setSelection(start, length) {
    this.getEditor().marker.setSelection(start, length);
  }

  onBlur(event) {
    this.setState({ focus: false });
  }

  render() {
    var editor = this.getEditor();

    return <div
      ref='editor'
      style={this.props.style}
      tabIndex='0'
      data-mouse-trap={false}
      className={['m-text-editor', this.props.className].join(' ')}
      onKeyPress={this.onKey.bind(this)}
      onKeyDown={this.onKeyCommand.bind(this)}
      onFocus={this.onFocus.bind(this)}
      onBlur={this.onBlur.bind(this)}>

      {
        editor.lines.map((line, i) => {
          return <LineComponent editor={editor} line={line} key={i} tokenComponentFactory={this.props.tokenComponentFactory} />
        })
      }

      { this.state.focus ? editor.marker.length > 0 ? <HighlightComponent marker={editor.marker} editor={editor} /> : <CaretComponent idle={this.state.idle} editor={editor} caret={editor.caret} /> : void 0 }
    </div>;
  }
}

export default TextEditorComponent;