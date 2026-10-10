Plan tile for pricing grids — exactly one card per grid should be `featured`.

```jsx
<PricingCard featured tier={<Badge>Fire Master</Badge>} name="Fire Nation Pro" price="$49"
  ribbon={<Badge>Most Popular</Badge>} action={<Button fullWidth>Unlock Full Power</Button>} />
```

12px radius, 40px/32px padding; featured scales to 1.03 so grids should be `items-center`.

## Materials
The featured tier gets the orbiting edge light and elevation 3. The others rest at elevation 1, lift on hover and carry a cursor spotlight. Wrap the row in `<div data-spotlight-group>` and load `assets/motion.js`. `element` tints both.
