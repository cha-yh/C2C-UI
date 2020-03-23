# C2C-UI
React UI kits with [styled-components](https://styled-components.com/) & [typescript](https://www.typescriptlang.org/)

## Description
This is a beta version library. It might have no problem to use. But It might be hard to read the [Docs](https://c2c-ui.netlify.com/) in current version.

## Installation
```sh
// npm
npm install react-c2c-ui

// yarn
yarn add react-c2c-ui
```

## Usage
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-c2c-ui';

function App() {
return (
    <Button theme="secondary">
        Hello World
    </Button>
);
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Docs
Check the [Docs](https://c2c-ui.netlify.com/) made of storybook

## License
This project is licensed under the terms of the
[MIT license](https://github.com/cha-yh/C2C-UI/blob/master/LICENSE.md).
