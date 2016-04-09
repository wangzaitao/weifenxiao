import React from 'react';

class UserGuide extends React.Component {
  render () {
    var styles = {
      body: {backgroundColor: '#fefe41', padding: '1em 0.9375em 0 0.9375em', height: '100%', margin: '0 auto'},
      content: {backgroundColor: '#fff', border: '0.2em solid #5e0006', borderRadius: '0.5em', marginTop: '1.5em', padding: '1.75em 1em 2.4em 1em'},
      footer: {width: '50%', padding: '2em 0', margin: '0 auto'}
    };
    return (
      <div className="m-body" style={styles.body}>
        <img src={require('../../img/guide/guide_header.png')} style={{width: '100%'}}/>
        <div style={styles.content}>
          <img src={require('../../img/guide/guide1.png')} style={{width: '100%'}}/>
          <img src={require('../../img/guide/guide2.png')} style={{width: '100%'}}/>
          <img src={require('../../img/guide/guide3.png')} style={{width: '100%'}}/>
        </div>
        <img src={require('../../img/guide/guide_footer.png')} style={styles.footer}/>
      </div>
    );
  }
}

export default UserGuide;
