# TP24 Project

## Important

In order to avoid CORS issues, the endpoint call is done using **CORS Everywhere**, please visit [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/) to enable it and be able to correctly call the endpoint on dev environment

## Overview

FE assignment from TP24 for data visualization from an endpoint.
Done with Vite and React.
Approximately 6 hours spent for this project.
Added some date formatting to visualize in human readable format the date and time. Pagination added to easily display multiple rows (Design inspired by MUI Data tab)

## Features

- **Data Visualization**: View invoice data in a tabulated format.
- **Pagination**: Easily navigate through large datasets.
- **Date Formatting**: Converts ISO dates to a more readable format.
- **Unit Tested**: High code reliability with a comprehensive test suite.
- **Basic CI**: Linting and testing when creating a PR against *main* branch

## Setup & Installation

**Prerequisites:**
Node.js (>= 16.x)
Yarn or npm

**Installation:**

Clone the repository:

``` bash
git clone https://github.com/your_username/tp24-project.git
```

Navigate to the project directory:

``` bash
cd tp24-project
```

Install dependencies:

``` bash
npm install # or yarn install
```

Start the development server:

``` bash
npm run dev # or yarn run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port displayed in your terminal) to view the application.

## Testing

Run the test suite in watch mode:

``` bash
npm run test:dev # or yarn run test:dev
```

Run the test suite with the following command:

``` bash
npm run test:coverage # or yarn run test:coverage
```

## Linting

Check code quality and adherence to standards using:

``` bash
npm run lint # or yarn run lint
```
