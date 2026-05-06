# Accessibility Checklist

Use this checklist before merges and preview deployments.

## Keyboard access

- [ ] All primary controls reachable by Tab.
- [ ] Buttons can be activated with Enter/Space.
- [ ] File import control is label-associated.

## Labels and regions

- [ ] Landmark regions have readable names (Tools, Workspace, Inspector, Keyboard, Transport).
- [ ] Form controls have explicit labels (`BPM`, `Loop enabled`, `Volume`, `Import JSON`).
- [ ] Dynamic status messages use `aria-live` where needed.

## Behavioral checks

- [ ] No automatic audio playback on initial page load.
- [ ] Failed JSON import shows readable error and app remains interactive.
- [ ] Synthetic example labels clearly state non-authoritative status.

## Screen-reader smoke pass

- [ ] App heading and major regions are announced in sensible order.
- [ ] Transport and file controls are discoverable by role and label.
