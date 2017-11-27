import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLikes } from '../actions';
import { bindActionCreators } from 'redux';


class Home extends Component {
  
  addLikes(action) {
    const props = this.props,
        newLikes = action === 'ADD' ? [props.likes + 1, props.dislikes] : [props.likes, props.dislikes + 1];
    
    this.props.handleLikes(newLikes, props.id, props.section, props.type);
    
    
  }
  
  render() {
    return (
        <div className={'addlikes-wrapper'}>
          <h3>How do you feel about this</h3>
          <div className={'addlikes-container'}>
            <div className={'btn like'} onClick={() => {
              this.addLikes('ADD');
            }}>
              <div className={'hits'}>{this.props.likes}</div>
              <div className={'icon'}>
                <i className={'fa fa-thumbs-up'}/>
              </div>
            </div>
            
            <div className={'btn dislike'} onClick={() => {
              this.addLikes('REMOVE');
            }}>
              <div className={'hits'}>{this.props.dislikes}</div>
              <div className={'icon'}>
                <i className={'fa fa-thumbs-down'}/>
              </div>
            </div>
          
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleLikes}, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);
