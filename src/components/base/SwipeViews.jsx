import React from 'react';

require('./swipe-views.css');

export default class SwipeViews extends React.Component {
  constructor(props) {
    super(props);
    var selectedIndex = this.props.selectedIndex || 0;
    var pageWidthPerCent = 100 / this.props.children.length;
    var translation = selectedIndex * pageWidthPerCent;
    this.state = {
      selectedIndex,
      pageWidthPerCent,
      translation,
      pageWidth: window.innerWidth
    };
  }
  componentDidMount() {
    this._selectIndex();
  }
  componentWillReceiveProps(nextProps) {
    this._selectIndex(parseInt(nextProps.selectedIndex, 10));
  }

  render() {
    var swipeViewsInkStyle = {
      width: this.state.pageWidthPerCent + '%',
      marginLeft: this.state.translation + '%'
    };

    return (
      <div className="swipe-views-container">
        <header className="swipe-views-header">
          <div className="swipe-views-tabs">
            <ul>
              {this.props.children.map((child, index) => {
                var className = (index === this.state.selectedIndex ? 'active' : '');
                return (
                  <li key={index} className={'swipe-views-tab ' + className + ' ' + (child.props.className || '')}
                      style={{width: this.state.pageWidthPerCent + '%'}} onTouchTap={this._handleClick.bind(this, index)}>
                    {child.props.title}
                  </li>
                );
              })}
            </ul>
            <div className="swipe-views-ink" style={swipeViewsInkStyle}></div>
          </div>
        </header>
        <div className="swipe-views">
          {this.props.children.map((child, index) => {
            var displayValue = (index === this.state.selectedIndex ? 'block' : 'none');
            return (
              <div className="swipe-view" style={{display: displayValue}} key={index} onScroll={this._handleScroll.bind(this)}>
                {child.props.children}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  _selectIndex(selectedIndex) {
    if (selectedIndex === parseInt(selectedIndex, 10)) {
      var translation = selectedIndex * this.state.pageWidthPerCent;
      return this.setState({
        selectedIndex,
        translation
      });
    }
  }
  _transitionTo(selectedIndex) {
    if (this.props.onIndexChange) {
      this.props.onIndexChange(selectedIndex);
    }
  }
  _handleClick(selectedIndex, event) {
    var translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation
    });
    if (event.target.localName === 'li') {
      this._transitionTo(selectedIndex);
    }
  }
  _handleScroll() {
    var selectedIndex = this.state.selectedIndex;
    var translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation
    });
  }

}

SwipeViews.propTypes = {
  children: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  onIndexChange: React.PropTypes.func
};
