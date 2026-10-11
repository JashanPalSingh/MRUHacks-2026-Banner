function BannerDisplay({ displayMode, darkMode, bannerImage, bannerImageWhite }) {
  return (
    <>
      <img
        className={`banner-image ${displayMode !== 'banner' || darkMode ? 'banner-image-hidden' : ''}`}
        src={bannerImage}
        alt="MRUHacks 2026"
      />
      <img
        className={`banner-image ${displayMode !== 'banner' || !darkMode ? 'banner-image-hidden' : ''}`}
        src={bannerImageWhite}
        alt=""
        aria-hidden="true"
      />
    </>
  )
}

export default BannerDisplay
