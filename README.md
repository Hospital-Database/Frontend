# ZU-Hospital System

[![Netlify Status](https://api.netlify.com/api/v1/badges/7bc03480-ccb7-4911-83d4-a20c989271e1/deploy-status)](https://app.netlify.com/sites/zu-hospital/deploys)

## Getting Started

```bash
pnpm dev
```

### I18n

**Install i18n-ally extension.**

We use i18n-ally extension which is available in many code editors including VSCode. It provides an inline preview of translations in your code directly. It is also helpful for automatically translating your messages using Google Translator for example. You can use it to extract text from the code and put them in the default locale file.

### Mantine components library

Mantine docs recommended adding this to `.vscode/settings.json` file:

```jsonc
{
  // for i18n-ally
  "i18n-ally.localesPaths": ["i18n", "messages"],
  "i18n-ally.keystyle": "nested",
  // for mantine
  "cssVariables.lookupFiles": [
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "node_modules/@mantine/core/styles.css",
  ],
}
```

## General Links

- [Figma](https://www.figma.com/file/uxb11MLYQ1fNDeGFOt7w6F/ZU-Hospital?type=design&mode=design&t=5kIZTGtOXSifi3yg-0)
- [tldraw](https://www.tldraw.com/v/yjshwRT1in9ukWbv7p6zt?v=-5354,296,4471,2363&p=page)
- [API Docs](https://zhospital.azurewebsites.net/swagger/)
