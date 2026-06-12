# Full Development Specification & Architecture Plan (Japan Language & Study Center)

This document contains the complete structural details, design guidelines, code architecture, and interactive behavior rules for the **Japan Language & Study Center** website.

---

## 1. Project Overview & Tech Stack
The project is built as a highly responsive, modern, and visually engaging single-page web application designed to attract and guide students/professionals from Bangladesh who wish to study or work in Japan.

- **Frontend Core:** HTML5 (semantic elements, embedded customized SVG artwork)
- **Styling System:** Vanilla CSS3 (custom CSS variables, CSS grid/flexbox layouts, responsive design, transition effects)
- **Interactive Logic:** Vanilla JavaScript (ES6+, state management, event listeners, dynamic UI controls)

---

## 2. Design System & Brand Identity

### A. Color Palette
The colors are inspired by traditional Japanese culture combined with clean modern interfaces:
*   **Primary Accent (Rising Sun):** `#E60012` (Vibrant Red)
*   **Secondary Accent (Gold/Bronze):** `#C5A059` (Premium metallic feel)
*   **Primary Dark (Text & Headers):** `#111111` (Matte Black)
*   **Secondary Dark (Backgrounds/Cards):** `#1A1A1A` / `#222222`
*   **Light Backgrounds:** `#FFFFFF` / `#FFF0F2` (Soft pink/Sakura tint) / `#F5F5F5` (Neutral gray)
*   **Alert/Success Color:** Green/Gold gradients for positive validation status.

### B. Typography & Hierarchy
- **Font Face:** [Google Fonts](https://fonts.googleapis.com/): *Outfit* (for geometric headers & badges) / *Poppins* (for body and navigation).
- **Japanese Calligraphic Styling:** Specific classes utilizing standard system font fallbacks (`Hiragino Mincho ProN`, `MS Mincho`, `serif`) for Japanese text elements (e.g., logo title *日本留学センター*).

### C. Visual Identity Elements
- Custom inline SVGs representing Japanese landmarks (Mount Fuji, Pagoda, Sakura branches, Torii gate, and Tokyo skyline).
- Animated micro-interactions: Pulsing location pins on custom maps, sliding tooltips, and card-hover zoom effects.

---

## 3. Page Structure & Components
The site is divided into logical, SEO-optimized sections inside [index.html](file:///e:/01_Working/website/v1.0.0/index.html):

| Section ID | Component Name | Description |
| :--- | :--- | :--- |
| **Top Bar** | Contact Info & Socials | Displays address, clickable tel link, and SVG social links. |
| `header` | Sticky Main Navigation | Contains custom SVG logo, desktop menu, Apply Now CTA, and responsive hamburger toggle. |
| `hero` | Hero Showcase | Engaging titles, primary badges, visa statistics, and dynamic inline SVG illustration. |
| `about` | Corporate Profile | Circular Yoshino-style decorative window displaying Mt. Fuji. Lists credentials (Native instruction, direct school partnerships). |
| `why-choose-us`| Value Pillars | 6-card interactive grid showcasing NAT-Test prep, visa filing, and pre-departure briefings. |
| `courses` | Language Academy | Cards outlining N5, N4, and Spoken Japanese programs (duration, schedule, syllabus details). |
| `study-in-japan`| Pathway Timeline | Vertical stepper guide representing assessing, language learning, COE application, and visa stamps. |
| `jobs` | Job Placements | Grid of corporate recruiter opportunities in IT, Caregiving (SSW), Hospitality, and Engineering. |
| `culture` | Cultural Focus | Highlights supplementary classes: Anime translation, Shodo calligraphy, Sado tea ceremony, and Origami folding. |
| `testimonials` | Success Stories | Automatic & manual slider showing comments, names, and photos of placed alumni. |
| `faq` | Help Accordion | Collapsible, smooth-animating answers to general queries. |
| `contact` | Booking Desk | Form with live input validation, linked with a customized vector map indicating the Panthapath office location. |
| `footer` | Site Map & Licensing | Organized footer containing site map links, program navigation, and address details. |
| **Floating Action** | WhatsApp Chat | Persistent floating WhatsApp button with custom pre-filled message support. |

---

## 4. CSS Styling Details ([style.css](file:///e:/01_Working/website/v1.0.0/css/style.css))

- **Layout Grid & Flexbox:** Custom CSS variables define the containers (`1200px` max-width), margins, padding levels, and transitions.
- **Scroll Reveal Animations:** Class `.animated` is added dynamically. Properties include `opacity: 0` and `transform: translateY(30px)` by default, transitioning to `opacity: 1` and `transform: none` on trigger.
- **Glassmorphism Effects:** Used in the header, testimonials, and mobile menu backdrop (`backdrop-filter: blur(10px)`).

---

## 5. JavaScript Logic Specifications ([main.js](file:///e:/01_Working/website/v1.0.0/js/main.js))

### A. Sticky Header
- Monitors `window.scrollY`. Adds class `.scrolled` when scroll position exceeds `50px`, updating padding, borders, and background opacity.

### B. Mobile Navigation Drawer
- Hamburger button toggles the `.open` state on the drawer.
- Adds an overlay backdrop blocking scroll on `document.body` (`overflow: hidden`) when the drawer is open.

### C. Scroll Reveal (Intersection Observer)
- Uses `IntersectionObserver` with a `threshold: 0.15` (triggers when 15% of the element is visible in the viewport).
- Proactively triggers animation transitions for grids, cards, and timelines, and detaches the observer (`unobserve()`) to optimize rendering performance.

### D. Testimonial Carousel
- Implements transform transitions (`translateX(-X%)`) for smooth slide animations.
- Generates pagination dots dynamically based on the slide count.
- Includes a 5-second interval auto-play mechanism that pauses on hover (`mouseenter` / `mouseleave`) and resets on manual click navigation.

### E. Accordion UI (FAQ)
- Toggle action measures `content.scrollHeight` to dynamically modify `max-height` for CSS-animated opening.
- Closes other open accordion cards when a new one is activated to maintain layout cleanliness.

### F. Form Validation (Consultation Form)
- Validates field values immediately on `blur` event and clears warnings on active typing (`input` event).
- **Bangladeshi Phone Number Rules:** Custom validation filters out non-digits and ensures exactly 11 digits starting with the standard prefix `01`.
- Renders an inline success notification (`Konnichiwa! ...`) upon valid submission and clears form values.

---

## 6. Verification and Testing Plan

### Automated/Code Validation
- Ensure all interactive buttons, inputs, links, and forms contain unique IDs and labels for accessibility/SEO checks.
- Keep the HTML5 and CSS3 structure verified against standard semantic compliance.

### Manual Testing Procedures
1. **Device Responsiveness:** Verify layout transitions on mobile viewports (<768px), tablets (768px - 1024px), and desktop systems (>1024px).
2. **Navigation Check:** Test mobile drawer opening/closing, sticky header transitions, and smooth scrolling offsets.
3. **Form Submissions:** Input valid and invalid credentials (wrong email formats, phone numbers with less/more than 11 digits) to verify real-time error notifications.
4. **Slide Auto-Play & Accordions:** Verify carousel auto-rotation pauses on pointer hover and accordions expand/collapse smoothly.
