# SketchTik Downloader ✏️

![screenshot](/screenshot.png)

**SketchTik** is a minimalist TikTok downloader web application. It features a unique "hand-drawn" UI design that mimics a sketchbook while providing powerful functionality to download TikTok videos without watermarks, HD videos, photo slideshows, and audio tracks.

## ✨ Features

- **No Watermark**: Download clean versions of TikTok videos.
- **HD Support**: Option to download high-definition video sources.
- **Photo Slideshows**: Automatically detects image posts and allows individual or bulk downloading.
- **Audio Extraction**: Extract and play the original sound/music (`.mp3`) directly.
- **Sketch UI**: A fully custom design system using irregular borders, "tape" effects, and handwriting fonts.
- **Responsive**: Works seamlessly on desktop and mobile devices.

## 🏗 Architecture

The application is built as a client-side React application. To bypass CORS (Cross-Origin Resource Sharing) restrictions inherent in browser-based API calls, it utilizes a proxy architecture.

### Data Flow

1.  **User Input**: User pastes a TikTok URL into the `SketchInput`.
2.  **Service Layer**: `tiktokService.ts` validates the URL.
3.  **Proxy Request**: The app sends a GET request to `api.allorigins.win` (CORS Proxy).
4.  **External API**: The proxy forwards the request to `www.tikwm.com/api` (The underlying data provider).
5.  **Response**: JSON data is parsed and normalized into a `TiktokResponse` object.
6.  **Rendering**: The `ResultCard` component displays the parsed media.

## 📂 Project Structure

```text
/
├── index.html                 # Entry point with Import Maps and Google Fonts
├── index.tsx                  # React DOM root mounting
├── App.tsx                    # Main application controller
├── types.ts                   # TypeScript interfaces (TiktokResponse, etc.)
├── metadata.json              # App metadata configuration
├── services/
│   └── tiktokService.ts       # API logic and CORS proxy handling
└── components/
    ├── SketchButton.tsx       # Custom irregular border buttons
    ├── SketchInput.tsx        # Hand-drawn input fields
    └── ResultCard.tsx         # The main display card for video/image results
```

## 🎨 Visual Design System

The app uses **Tailwind CSS** combined with custom CSS classes to achieve the sketch look:

- **Fonts**:
  - _Headings/Accents_: `Patrick Hand` (Google Fonts) - Handwriting style.
  - _Body_: `Space Mono` (Google Fonts) - Raw, typewriter style.
- **Borders**: The `.sketch-border` and `.sketch-border-sm` classes use specific `border-radius` values (e.g., `255px 15px 225px 15px / 15px 225px 15px 255px`) to create non-uniform, organic shapes.
- **Shadows**: Hard, offset shadows (`box-shadow`) mimic ink depth.
- **Animations**: subtle entry animations (`animate-in`) and hover tilt effects (`rotate-1`) enhance the tactile feel.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Source**: TikWM API (via AllOrigins proxy)

## 🚀 Getting Started

Since this project uses ES Modules via `importmap` in `index.html` (no build step required for modern browsers in this specific setup), you can simply serve the files.

However, in a standard development environment:

1.  **Clone the repository**
2.  **Install dependencies** (if migrated to Vite/CRA)
    ```bash
    npm install
    ```
3.  **Run the server**
    ```bash
    npm run dev
    ```

## ⚠️ Disclaimer

This project is for educational purposes only. It interacts with third-party APIs (TikWM). Please respect the intellectual property rights of content creators and TikTok's terms of service.
