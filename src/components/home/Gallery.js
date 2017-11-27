import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Gallery = (props) => {
  
  const showGallery = ({latestGallery}) => {
    if (!latestGallery) return;
    return (
        <Slider {...settings}>
          {latestGallery.map(item => {
            return (
                <Link key={item.id} className={'slider-item'} to={`/galleries/${item.id}`}>
                  <div className={'image'} style={{background: `url(/images/galleries/${item.images[0].img})`}}>
                    <h3>{item.artist}</h3>
                  </div>
                </Link>
            );
          })}
        </Slider>
    
    );
  };
  
  return (
      <div className={'home-gallery'}>
        <h2>Awesome gallery</h2>
        {showGallery(props)}
      </div>
  );
  
};

export default Gallery;
