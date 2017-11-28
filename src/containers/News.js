import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectNews, clearSelectedNews, addView } from '../actions';
import { bindActionCreators } from 'redux';

import Counter from './LikesCounter';


class News extends Component {
  
  componentDidMount() {
    this.props.selectNews(this.props.match.params.id)
        .then(response => {
          const selected = Object.assign({}, response.payload[0]);
          return this.props.addView(selected.views + 1, selected.id, 'articles', 'ADD_VIEW_ARTICLE');
        });
    
  }
  
  componentWillUnmount() {
    this.props.clearSelectedNews();
  }
  
  renderNews({selected}) {
    if (!selected) return;
    return selected.map((item) => {
      return (
          <div key={item.id}>
            <div className={'tags'}>
              <span>
                <i className={'fa fa-eye'}/>{item.views}
              </span>
              <span>
                <i className={'fa fa-thumbs-up'}/>{item.likes[0]}
              </span>
              <span>
                <i className={'fa fa-thumbs-down'}/>{item.likes[1]}
              </span>
            </div>
            <div className={'top'}>
              <h2>{item.title}</h2>
              <span>Article by: <strong>{item.author}</strong></span>
            </div>
            <img alt={item.title} src={`/images/articles/${item.img}`}/>
            <div className={'body_news'}>
              {item.body}
            </div>
            <div>
              <Counter
                  id={item.id}
                  likes={item.likes[0]}
                  dislikes={item.likes[1]}
                  type='HANDLE_LIKES_ARTICLE'
                  section='articles'
              />
            </div>
          </div>
      );
    });
  }
  
  render() {
    return (
        <div className={'news_container'}>
          {this.renderNews(this.props.articles)}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectNews,
    clearSelectedNews,
    addView
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
