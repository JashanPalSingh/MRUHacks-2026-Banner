# MRUHacks 2026 Banner

The MRUHacks 2026 Banner is a polished event-display screen for a lobby monitor, projector, or kiosk. It combines:

- A branded MRUHacks 2026 banner with an animated Aurora background
- Automatic sponsor slides
- An optional Edmonton clock and live event schedule
- Light and dark presentation modes
- A responsive React interface that works well at different display sizes

The project is built with React and Vite. It is intentionally simple to operate: update the event CSV or sponsor image folder, start the app, and the display takes care of the rest.

## Quick start

### Requirements

- Node.js 20 or newer
- npm

### Install and run locally

From the project directory:

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`. Open it in a browser and use the controls in the lower-right corner to show the schedule or switch themes.

### Production build

Create an optimized build with:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The generated files are written to `dist/`.

## Editing event details

Event data lives in [`src/assets/Event.csv`](./src/assets/Event.csv). The first row is the header, followed by one event per line:

```csv
Title,Location,Start Date,Start Time,End Date,End Time
Opening Ceremony,Science Theatres,2026-10-24,9:00 AM,2026-10-24,9:30 AM
```

Each column means:

| Column | Description | Example |
| --- | --- | --- |
| `Title` | The event name shown on screen | `Opening Ceremony` |
| `Location` | The room or venue | `Science Theatres` |
| `Start Date` | Date in `YYYY-MM-DD` format | `2026-10-24` |
| `Start Time` | 12-hour time with `AM` or `PM` | `9:00 AM` |
| `End Date` | Date in `YYYY-MM-DD` format | `2026-10-24` |
| `End Time` | 12-hour time with `AM` or `PM` | `9:30 AM` |

### Schedule tips

- Times are interpreted in the `America/Edmonton` time zone, including daylight-saving changes.
- Use `12:00 AM` for midnight and `12:00 PM` for noon.
- Events are sorted automatically by start time.
- The clock and schedule are hidden when the app first opens. Press the clock button to show them.
- The schedule shows the active event, its progress, and upcoming events.
- Keep titles and locations free of commas. The CSV parser treats commas as column separators.
- After changing the CSV, restart the development server or rebuild the app so Vite includes the updated raw file.

## Adding and removing sponsors

Sponsor images live in [`src/assets/sponsors/`](./src/assets/sponsors/). The app automatically includes files with these extensions:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.gif`

### Add a sponsor

1. Add the sponsor logo to [`src/assets/sponsors/`](./src/assets/sponsors/).
2. Use a supported image extension.
3. Prefer a high-resolution logo with a transparent background.
4. Preview the result with `npm run dev`, or rebuild with `npm run build`.

Example:

```text
src/assets/sponsors/
├── Arcurve.png
├── MRUIIE.png
├── MRUL.png
└── NewSponsor.png
```

The filename is used internally as the image identity; it does not appear as text on screen. Every sponsor slide uses the accessible label `Event sponsor`.

### Remove a sponsor

Delete the sponsor image from [`src/assets/sponsors/`](./src/assets/sponsors/). No JavaScript or configuration change is needed.

### Sponsor rotation

The display shows the main banner for 60 seconds, then cycles through sponsor images for 5 seconds each before returning to the banner. This timing is defined in [`src/App.jsx`](./src/App.jsx). If there are no sponsor images, the app stays on the banner.

## Display controls

The two controls in the lower-right corner are:

- **Clock button (`◷`)**: Shows or hides the Edmonton time, date, and event schedule.
- **Theme button (`☾` / `☀`)**: Switches between light and dark banner presentation.

The clock refreshes once per minute while visible. The current event progress indicator updates whenever the displayed time changes.

## Project structure

```text
src/
├── App.jsx                         # Shared state and display composition
├── App.css                         # Banner, schedule, sponsor, and control styles
├── components/
│   ├── Aurora.jsx                  # Animated background
│   ├── BannerDisplay.jsx            # Light/dark banner images
│   ├── ClockDisplay.jsx             # Time and date
│   ├── DisplayControls.jsx          # Clock and theme buttons
│   ├── ScheduleDisplay.jsx          # Current and upcoming events
│   └── SponsorDisplay.jsx           # Sponsor slide rendering
├── assets/
│   ├── Event.csv                   # Event schedule source data
│   ├── MRUHacks2026BannerBlack.png # Light-mode banner
│   ├── MRUHacks2026BannerWhite.png # Dark-mode banner
│   └── sponsors/                   # Automatically discovered sponsor logos
└── utils/
    └── schedule.js                 # CSV parsing and event visibility logic
```

## Quality checks

Run the linter and production build before sharing changes:

```bash
npm run lint
npm run build
```

The linter may report warnings in the Aurora animation component; the build must complete successfully before deploying.
