Top-of-page unit for landing and marketing views; headlines are Inter 800. Do not mix the brush face into the title.

```jsx
<Hero element="fire" title={<>Harness the Elements<br/>in Your UI</>}
  subtitle="A complete dark-theme design system."
  eyebrow={<Badge element="fire">Fire Primary</Badge>}
  actions={<Button size="lg">Get Presets</Button>} />
```

96px vertical padding; swap `element` (fire, water, earth, air, avatar, or success/warning/info) to retheme the halo and title glow. Set `glowTitle={false}` to drop the title's text glow, e.g. over busy imagery.

Add `parallaxHalo` (with `assets/motion.js` loaded) to split the halo onto its
own layer so it drifts at 0.35 against the content's 0.08 while scrolling.
