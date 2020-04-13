# C2C-UI
React UI kits with [styled-components](https://styled-components.com/) & [typescript](https://www.typescriptlang.org/)

## Description
This is a beta version library. It might have no problem to use. But It might have cross-browsing issues and some bugs. It will be fixed.

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

## Changed props of Popup component
Props of `Popup` are changed from **0.7.3** version.
Removed `onClickTrigger`, `onClose` props and added `setTarget`.
```tsx
    ...
    const [popupTarget, setPopupTarget] = useState("");
    return (
        <div>
            <Popup 
                ... // required props and other props you want
                name={"popup1"}
                setTarget={(target:string)=>{
                    // Add code lines that can change `target` value
                    setPopupTarget(target);
                }}
                target={popupTarget}
            />
            <Popup 
                ... // required props and other props you want
                name={"popup2"}
                setTarget={(target:string)=>{
                    // Add code lines that can change `target` value
                    setPopupTarget(target);
                }}
                target={popupTarget}
            />
        </div>
    )
```

## Deleted Dropdown, DropdownMulti
The `Dropdown` and `DropdownMulti` are not able to use from **0.7.0** version.
Please use the `Select` component instead of the `Dropdown` and `DropdownMulti`.
```tsx
    /** Same as Dropdown */ 
    <Select 
        ... // required props and other props you want
        multiple={false} // or skip this prop
    />
    
    /** Same as DropdownMulti */ 
    <Select 
        ... // required props and other props you want
        multiple // or multiple={true}
    />
```

## Docs
Check the [Examples and Docs](https://c2c-ui.netlify.com/) made of storybook

## License
This project is licensed under the terms of the
[MIT license](https://github.com/cha-yh/C2C-UI/blob/master/LICENSE.md).
