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

### General
- Fixtures are global variables that are available across multiples test or files.

### Debugging 
In order to debug a test, add the --debug flag, the final command would be like:
```
npx playwright test --debug
```

### Codegen
To record and play you can use the command:
```
npx playwright test --codegen http://google.com
```