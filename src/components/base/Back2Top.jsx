import React from 'react';

class Back2Top extends React.Component {
  componentDidMount() {
    var back2Top = document.querySelector("#back2Top");
    back2Top.addEventListener("click", function() {
      document.body && (document.body.scrollTop=0);
      document.documentElement && (document.documentElement.scrollTop=0);
    }, false);

    window.addEventListener('scroll', function() {
      back2Top.style.display = document.body.scrollTop > 200 ? 'block' : 'none';
    }, false);
  }

  render () {
    return <button id="back2Top">返回顶部</button>;
  }
}

export default Back2Top;
