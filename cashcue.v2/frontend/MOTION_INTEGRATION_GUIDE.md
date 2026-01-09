# Motion Integration Guide

This guide explains how to safely add animations to the CashCue project using the new additive motion system. All components are designed to be "drop-in" wrappers that do not break existing styling or logic.

## 📦 Installation

Ensure `framer-motion` is installed:
```bash
npm install framer-motion
```

## 🚀 Components

### 1. RevealOnScroll
Wraps any content to animate it when it enters the viewport.

**Import:**
```jsx
import RevealOnScroll from './components/motion/RevealOnScroll';
```

**Usage:**
```jsx
// Before
<div className="card">
  <h2>Service Title</h2>
  <p>Description...</p>
</div>

// After
<RevealOnScroll variant="slideUp">
  <div className="card">
    <h2>Service Title</h2>
    <p>Description...</p>
  </div>
</RevealOnScroll>
```

**Props:**
- `variant`: 'fadeIn', 'slideUp', 'slideDown', 'slideInLeft', 'slideInRight', 'scaleIn'
- `delay`: Number (seconds), e.g., `0.2`
- `duration`: Number (seconds), optional custom duration

---

### 2. MicroInteraction
Adds subtle hover and focus effects to interactive elements.

**Import:**
```jsx
import MicroInteraction from './components/motion/MicroInteraction';
```

**Usage:**
```jsx
// Before
<button className="btn-primary">Click Me</button>

// After
<MicroInteraction type="button">
  <button className="btn-primary">Click Me</button>
</MicroInteraction>
```

**Props:**
- `type`: 'button', 'card', 'icon'

---

### 3. CountUpOnScroll
Animates numeric values when visible.

**Import:**
```jsx
import CountUpOnScroll from './components/motion/CountUpOnScroll';
```

**Usage:**
```jsx
// Before
<span>500+ Projects</span>

// After
<span>
  <CountUpOnScroll end={500} suffix="+" /> Projects
</span>
```

**Props:**
- `end`: User target number
- `decimals`: Number of decimal places
- `prefix` / `suffix`: Strings to attach

---

### 4. PageTransition
Wraps page content for smooth transitions between routes.

**Import:**
```jsx
import PageTransition from './components/motion/PageTransition';
```

**Usage (in Page Component):**
```jsx
const Home = () => {
  return (
    <PageTransition>
      <div className="home-page">
        {/* ... content */}
      </div>
    </PageTransition>
  );
};
```

## 🛠 Advanced Usage (Hooks)

If you need more control or want to animate components directly without a wrapper div:

### useScrollReveal
```jsx
import useScrollReveal from './hooks/use-scroll-reveal';
import { motion } from 'framer-motion';

const MyComponent = () => {
  const revealProps = useScrollReveal('fadeIn', 0.2);

  return (
    <motion.div {...revealProps} className="existing-class">
      Content
    </motion.div>
  );
};
```

## ♿ Accessibility

All motion components automatically respect the user's `prefers-reduced-motion` operating system setting.
- `RevealOnScroll` → Renders immediately without fading/sliding
- `CountUpOnScroll` → Shows final number immediately
- `MicroInteraction` → Disables hover transforms

## ⚠️ Best Practices
1. **Don't Overdo It**: Use animations sparingly to maintain a premium feel.
2. **Wrapper Divs**: `RevealOnScroll` adds a `div` to the DOM. If this breaks a flex/grid layout, ensure you apply `className` to the wrapper to match the child's layout needs (e.g., `className="flex-1"`).
3. **Performance**: Avoid animating expensive properties like `box-shadow` or `width/height`. The system uses safe transforms (`opacity`, `translate`, `scale`).
