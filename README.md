# TEDI Design System

Steps to use for `tedi-design-system` are described in [wiki](https://github.com/TEHIK-EE/tedi-design-system/wiki).

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
