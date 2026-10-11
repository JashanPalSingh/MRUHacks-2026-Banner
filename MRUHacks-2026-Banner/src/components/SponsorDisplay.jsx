function SponsorDisplay({ displayMode, darkMode, sponsorImages, sponsorIndex }) {
  return (
    <section
      className={`sponsor-stage ${displayMode === 'sponsor' ? '' : 'banner-image-hidden'}`}
      aria-label="Event sponsor"
    >
      {sponsorImages.map((image, index) => (
        <img
          className={`sponsor-image ${index === sponsorIndex ? '' : 'sponsor-image-hidden'}`}
          key={image}
          src={image}
          alt="Event sponsor logo"
        />
      ))}
      <strong className={`sponsor-label ${darkMode ? 'sponsor-label-dark' : ''}`}>
        Brought to you by
      </strong>
    </section>
  )
}

export default SponsorDisplay
