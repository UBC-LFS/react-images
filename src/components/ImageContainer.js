import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from '../theme';
import Footer from './Footer';
import Header from './Header';

function renderImage ({ props, image, isVisible }) {
  const {
    images,
    imageCountSeparator,
    index,
    onClickImage,
    showImageCount,
    showThumbnails,
    } = props;

  let srcset;
  let sizes;

  if (image.srcset) {
    srcset = image.srcset.join();
    sizes = '100vw';
  }

  const thumbnailsSize = showThumbnails ? theme.thumbnail.size : 0;
  const heightOffset = `${theme.header.height + theme.footer.height + thumbnailsSize + (theme.container.gutter.vertical)}px`;

  return (
    <figure className={css(classes.figure)}>
      <img
        className={css(classes.image)}
        onClick={!!onClickImage && onClickImage}
        sizes={sizes}
        src={isVisible ? image.src : "data:"}
        srcSet={isVisible ? srcset : null}
        style={{
						cursor: onClickImage ? 'pointer' : 'auto',
						maxHeight: `calc(100vh - ${heightOffset})`
					}}
      />
      <Footer
        caption={image.caption}
        countCurrent={index + 1}
        countSeparator={imageCountSeparator}
        countTotal={images.length}
        showCount={showImageCount}
      />
    </figure>
  );
}

const ImageContainer = (props) => {
  const {
    customControls,
    showCloseButton,
    width,
    image,
    isVisible,
    onClose,
    marginBottom,
    browserHeight,
    browserWidth
  } = props;

  console.log('ImageContainter:', props)

  const horizontalPadding = theme.container.gutter.horizontal;

  const setDesciptionMaxHeight = () => {
    let descriptionMaxHeight = browserHeight;
    descriptionMaxHeight -= 50; // substract contentContainer padding (10px) and button div height (40px)
    let estimateImageHeight = 0;
    if (image.height > 0.6 * browserHeight) {
      estimateImageHeight = 0.6 * browserHeight;
    } else if (image.width > browserWidth) {
      estimateImageHeight = (browserWidth - 30) * (image.height / image.width);
    } else {
      estimateImageHeight = image.height;
    }
    descriptionMaxHeight -= estimateImageHeight - 26;
    console.log(descriptionMaxHeight)
    return descriptionMaxHeight;
  }

  return (
    <div
      className={css(classes.contentContainer)}
      style={{ width: window.innerWidth, paddingLeft: horizontalPadding, paddingRight: horizontalPadding, paddingTop: horizontalPadding}}
    >
      <div className={css(classes.contentHead)} style={{ marginBottom: marginBottom, width: (window.innerWidth - 30) }}>
      <Header
        customControls={customControls}
        onClose={onClose}
        showCloseButton={showCloseButton}
        descriptionMaxHeight={setDesciptionMaxHeight()}
      />
      <div className={css(classes.content)} style={{ marginBottom: marginBottom, maxWidth: (window.innerWidth - 30) }}>
        {renderImage({ props, image, isVisible })}
      </div>
    </div>
    </div>
  )
};

const classes = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '98vh'
  },
  contentHead: {
    position: 'relative'
  },
  content: {
    position: 'relative',
    height: 'calc(100% - 40px)',
  },
  figure: {
    height: '100%',
    margin: 0 // remove browser default
  },
  image: {
    display: 'block', // removes browser default gutter
    height: 'auto',
    margin: '0 auto', // maintain center on very short screens OR very narrow image
    maxWidth: '100%',
    flex: '0 1 auto',

    // disable user select
    WebkitTouchCallout: 'none',
    userSelect: 'none'
  }
});

export default ImageContainer;
