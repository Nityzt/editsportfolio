# 🎬 Interactive Video Portfolio

A modern, responsive portfolio website featuring smooth animations, horizontal scrolling, and interactive video thumbnails. Built with vanilla JavaScript and GSAP for premium user experience.

## ✨ Features

- **Smooth Welcome Experience**: Animated preloader and welcome screen with video background
- **Horizontal Scrolling**: Fluid horizontal navigation through portfolio items
- **Interactive Thumbnails**: Hover effects revealing sub-thumbnails with smooth animations
- **Video Player Integration**: Embedded YouTube player with custom overlay
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Touch Support**: Native touch gestures for mobile navigation
- **Performance Optimized**: Hardware-accelerated animations and lazy loading
- **Modular Architecture**: Clean, maintainable JavaScript module structure

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 modules)
- **Animations**: GSAP (GreenSock Animation Platform)
  - ScrollTrigger
  - ScrollToPlugin
  - SplitText
- **Video**: HTML5 Video, YouTube Embed API
- **Build**: No build process required - pure vanilla implementation

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── js/
│   ├── main.js               # Entry point and initialization
│   ├── core/
│   │   ├── constants.js      # DOM element references and utilities
│   │   └── preloader.js      # Loading screen and welcome animation
│   └── interactions/
│       ├── clickanimation.js    # Thumbnail click animations
│       ├── fade-background-video.js # Background video controls
│       ├── hover.js             # Hover effects and thumbnail interactions
│       ├── idle-animation.js    # Idle state animations
│       ├── interactionState.js  # Interaction state management
│       ├── scroll-horizontal.js # Horizontal scrolling logic
│       ├── thumbnails.js        # Thumbnail entrance animations
│       └── videoplayer.js       # Video player functionality
├── videos/                   # Video assets
├── previews/                # Video preview files
└── thumbs/                  # Thumbnail images
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Add your content**
   - Replace video files in `/videos/`, `/previews/`, and `/thumbs/` directories
   - Update YouTube video IDs in the `data-video` attributes
   - Customize welcome screen text in `index.html`

3. **Serve the files**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or use any local development server
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🎯 Usage

### Adding New Portfolio Items

1. **Add thumbnail container**:
   ```html
   <div class="thumb-container">
     <div class="video-thumb1">
       <div class="thumb9" data-video-background="previews/your-video.mp4" data-video="YOUR_YOUTUBE_ID">
         <img src="thumbs/your-thumb.jpg" alt="" loading="lazy">
       </div>
       <!-- Sub-thumbnails -->
       <div class="thumb9-1"><img src="thumbs/sub1.jpg" alt=""></div>
       <div class="thumb9-2"><img src="thumbs/sub2.jpg" alt=""></div>
       <div class="thumb9-3"><img src="thumbs/sub3.jpg" alt=""></div>
       <div class="thumb9-4"><img src="thumbs/sub4.jpg" alt=""></div>
     </div>
   </div>
   ```

2. **Update CSS** to include your new thumbnail classes if needed

3. **Add corresponding video files** to the appropriate directories

### Customizing Animations

Animation timings and easing can be modified in:
- `thumbnails.js` - Entrance animations
- `hover.js` - Hover effects
- `clickanimation.js` - Click interactions
- `preloader.js` - Welcome screen sequence

### Configuration Options

Key configuration options in `constants.js`:
```javascript
// Update selectors for your content
export const mainThumbs = document.querySelectorAll('[data-video]');
```

## ⚡ Performance Features

- **Hardware acceleration**: CSS transforms and GSAP animations
- **Lazy loading**: Images load on demand
- **Touch optimization**: Optimized touch events and momentum scrolling
- **Reduced motion support**: Respects `prefers-reduced-motion` setting
- **Mobile optimizations**: Touch-specific interactions and viewport handling

## 🎨 Customization

### Styling
- Modify CSS variables in the `<style>` section of `index.html`
- Adjust animation durations and easing functions
- Update color schemes and typography

### Animations
- Customize GSAP timelines in interaction modules
- Adjust stagger timing and animation sequences
- Modify hover effects and transitions

### Layout
- Update thumbnail sizing and spacing
- Modify responsive breakpoints
- Customize scroll behavior and momentum

## 🙏 Acknowledgments

- **GSAP** for powerful animation capabilities
- **YouTube** for video embedding
- **Modern web standards** for enabling smooth performance

---

**⭐ Star this repository if you found it helpful!**
