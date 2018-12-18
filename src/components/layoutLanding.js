import React from 'react';
import '../assets/css/index.css';
import HeaderLanding from './headerLanding';

class Template extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <HeaderLanding/>
          {children}
      </div>
    );
  }
}

export default Template;
