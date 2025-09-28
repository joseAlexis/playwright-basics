# playwright-basics

## Why playwright?
Playwight is an excelent choise when doing UI test automation, some of the benefits are:
- Has auto-wait capability, similar to Cypress.
- Cross Browser compatibility.
- Multiplatform support
  - MacOs, Win, Linux, etc
- Multilingual flexibility.


Advanced features
- Tracing and debugging.
- Network interception.
- Browser context management.
- Codegen tool.

## Learning notes
- If ```trace: on``` in the config file, you can check and upload the zip in this [site](https://trace.playwright.dev/) to see the trace details.

### General
- Fixtures are global variables that are available across multiples test or files.

### Debugging 
In order to debug a test, add the --debug flag, the final command would be like:
```
npx playwright test --debug
```

Another way to debug with VS Code is with adding the run command into the scripts section in the package json, and using Crtl + Cmd + P search for "Debug: Debug npm script", add breakpoint in the code and run script. This is good to check API responses, if is mainly involved UI components use option above.

### Codegen
To record and play you can use the command:
```
npx playwright test --codegen http://google.com
```