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

## Project parts

### Login page

- Cookies
- Managing the session and storing JWT tokens.
- Store the user type (patient, doctor, or admin) in a cookie.
- Refresh the access token after expiration. (Related to Axios library, which is used for making requests to the backend server.)
- Logout will just remove the cookies.
- Automatically log out if the refresh token expires.

### Add patient

- Check for existing patients with the same national ID and display action buttons if so.
  - Go to this patient page.
  - Add a visit to this patient.
- Data of the address field (street, city, governorate) is stored in a file in the front end.
- Upload an image for the patient.
- Using the same form for editing the patient.
- Only the name and the national ID are required, other fields may be empty.

### Patient page

- Common header for the page:
  - Display the current active visit details.
  - Actions menu (three dots).
    - Edit button (go the a page similar to the page for adding patients).
    - Delete (soft deleting) the patient.
- Details tabs:
  - Display the patient details.
  - Display the patient visits in a table.
  - Display the doctors the patient once visited in a table.
- Measurements tab:
  - Display the patient measurements in a table.
  - Add a measurement if a visit is currently active.
  - Display a graph of the patient measurements.
- Documents tab:
  - Display the current documents.
  - Drag-and-drop field to add more documents.
    - Automatically detect the file name.
  - Delete or edit a document.
    - You can edit the file name or the file kind (i.e. blood test).

### Theme & Translation

- The main task here is to make sure all page implemented translation and dark/light modes correctly.
- We used [**Mantine**](https://mantine.dev/) library for the UI components.
- We used VSCode [**i18n-ally**](https://github.com/lokalise/i18n-ally) extension for the translation.

### Table component

- Customizing `mantine-react-table` library.
- Build the common logic of the table to be used in all the system pages.
- Store the filtering state, pagination, and sorting.
- Export to CVS file.
- Refresh data.

### Dashboard

- Display statistics (i.e. patients count).
- Display the active, upcoming, and missed visits in a table.

### Patients page

- Patients table with search, sort, and other features.
- Current vs. Deleted tabs.
- Configure columns.

### Doctors page

- Doctors table with search, sort, and other features.
- Current vs. Deleted tabs.
- Configure columns.
- Create a new doctor button.
- Actions menu.
  - Delete, restore, or edit the doctor.
