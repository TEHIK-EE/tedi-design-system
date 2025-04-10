# TEDI Design System

[![codecov](https://codecov.io/gh/TEHIK-EE/tedi-design-system/graph/badge.svg?token=NKNNJSG19D)](https://codecov.io/gh/TEHIK-EE/tedi-design-system)
[![semantic-release](https://img.shields.io/badge/semantic--release-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

The TEDI Design System provides reusable UI components for multiple frameworks.

Usage instructions can be found in the [wiki](https://github.com/TEHIK-EE/tedi-design-system/wiki).

---

## Development Guide

### Setting Up the Project

Components are separated into packages by framework. Each package is managed separately.

#### 1. Installing dependencies.

Run the following command at the root to install shared dependencies:

```
npm install
```

Then, install dependencies for the specific library you are working on:

For **React components**:

```
npm run install:react
```

For **Angular components**:

```
npm run install:angular
```

Alternatively, you can install everything from root `package.json`:

```
  npm run install:all
```

#### 2. Running Storybook

Run your desired Storybook from root:

```
npm run start:react
npm run start:angular
```

---

### **Additional Resources**

Check the [wiki](https://github.com/TEHIK-EE/tedi-design-system/wiki) for detailed documentation.  
Report issues or contribute via [GitHub Issues](https://github.com/TEHIK-EE/tedi-design-system/issues).

---

### Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.

###

Welcome to package-lock.json party 🥳
