## NODE.JS

- Node 16.x || 18.x

## USING YARN (Recommend)

- yarn install
- yarn dev

## USING NPM

- npm i OR npm i --legacy-peer-deps
- npm run dev

# Toast Notification Guide

This project uses a custom `toast` notification system through `enqueueSnackbar` to display messages to the user. Below is a guide on how to use and implement it in your components.

## Usage

### Importing the toast components

First, import the necessary components from our `src/components/toast` module:

```typescript
import { VariantType, enqueueSnackbar } from 'src/components/toast';

// VariantType ('success' | 'error')
const onSnackbarAction = (color: VariantType) => {
  enqueueSnackbar(`This is a message`, {
    variant: color,
    description: 'This is a description',
  });
};
```
