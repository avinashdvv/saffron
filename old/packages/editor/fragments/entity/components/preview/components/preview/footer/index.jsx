import './index.scss';

import React from 'react';
import RegisteredComponent from 'common/components/registered';

class FooterComponent extends React.Component {
  render() {

    // TODO - add more project information here such as file name
    // TODO - ability to edit canvas width & height in the footer
    // TODO - each one of these should be slideable, or be their own button
    var app = this.props.app;
    return <div className='m-preview-footer'>
      { Math.round(app.preview.zoom * 100) }%
      &nbsp;
      { app.preview.canvasWidth }W x { app.preview.canvasHeight }H

      <RegisteredComponent {...this.props} query={'preview/footerComponents'} />
    </div>;
  }
}

export default FooterComponent;
