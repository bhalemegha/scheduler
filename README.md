# Interview Scheduler
Scheduler is a Single Page Application. It has been built to learn React and Testing frameworks like Jest, Storybook and Cypress. It uses PostgreSQL to persist data. It communicates with API server over HTTP and uses JSON format.

## Final Product
All Appointments for selected days

![Schedules](https://github.com/bhalemegha/scheduler/blob/master/docs/Schedules.jpg)

Form to create new or edit appointment

![New or Edit Form](https://github.com/bhalemegha/scheduler/blob/master/docs/Save_Edit_form.jpg)

confirmation dialog before deleting appointment

![Delete Confirmation Dialog Box](https://github.com/bhalemegha/scheduler/blob/master/docs/confirm_delete_dialog.jpg)
## Setup and Dependencies

Install dependencies with `npm install`.

    "@storybook/addon-actions",
    "@storybook/addon-backgrounds"
    "@storybook/addon-links"
    "@storybook/addons"
    "@storybook/react"
    "@testing-library/jest-dom"
    "@testing-library/react"
    "cypress"
    "dom-testing-library"
    "node-sass"
    "prop-types"
    "react-test-renderer"
    "storybook"
    "build-storybook"
    "cypress" 

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
