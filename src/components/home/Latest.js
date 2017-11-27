import React from 'react';
import { Link } from 'react-router-dom';

const Latest = (props) => {
  
  const showLatest = ({latest}) => {
    if (!latest) return;
    return latest.map((item) => {
      return (
          <Link className={'item'} key={item.id} to={`news/${item.id}`}>
            <div className={'image_cover'}
                 style={{background: `url(/images/articles/${item.img})`}}>
              <div className={'description'}>
                <span>{item.category}</span>
                <div>{item.title}</div>
              </div>
            </div>
          </Link>
      );
    });
  };
  
  return (
      <div className={'home-latest'}>
        {showLatest(props)}
      </div>
  );
  
};

export default Latest;
