import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectGallery, clearSelectedGallery, addView } from '../actions';
import { bindActionCreators } from 'redux';
import Slider from 'react-slick';
import Counter from '../containers/LikesCounter';

const settings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 500
};


class GalleryItem extends Component {
  
  componentDidMount() {
    this.props.selectGallery(this.props.match.params.id)
        .then(response => {
          const selected = Object.assign({}, response.payload[0]);
          return this.props.addView(selected.views + 1, selected.id, 'galleries', 'ADD_VIEW_GALLERY');
        })
  }
  
  componentWillUnmount() {
    this.props.clearSelectedGallery();
  }
  
  renderSlider({selected}) {
    if (selected && selected.length) {
      const gallery = selected[0];
      return (
          <div>
            <h3>The best of {gallery.artist}</h3>
            <Slider {...settings}>
              {gallery.images.map((item, index) => {
                return (
                    <div className={'slide-item'} key={index}>
                      <div className={'image'} style={{background: `url(/images/galleries/${item.img})`}}>
                      
                      </div>
                      <div className={'description'}>
                        <span>{item.desc}</span>
                      </div>
                    </div>
                );
              })}
            </Slider>
            
            <Counter
                id={gallery.id}
                likes={gallery.likes[0]}
                dislikes={gallery.likes[1]}
                type='HANDLE_LIKES_GALLERY'
                section='galleries'
            />
          
          </div>
      );
    }
    
  }
  
  render() {
    return (
        <div className={'slide-item-wrap'}>
          {this.renderSlider(this.props.gallery)}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gallery: state.gallery
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectGallery,
    clearSelectedGallery,
    addView
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
