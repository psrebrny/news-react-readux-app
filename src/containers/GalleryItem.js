import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectGallery, clearSelectedGallery } from '../actions';
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
    this.props.selectGallery(this.props.match.params.id);
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
    clearSelectedGallery
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
