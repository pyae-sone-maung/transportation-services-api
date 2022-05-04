## Transportation Services API

This project is a Backend API that collects data on some of the transportations services in Taungup city, Rakhine State.

### Prerequisites

-   Install [Node.js](https://nodejs.org/en/) version v12.22.5

### Installation

#### Download or Clone the repository

-   Run this command on terminal or [Download here](https://github.com/pyae-sone-maung/transportation-services-api/archive/refs/heads/main.zip/).

```
https://github.com/pyae-sone-maung/transportation-services-api.git
```

-   Install dependencies

```
cd transportation-services-api
npm install
```

-   Build and run the project

```
npm run dev
```

-   Navigate to `http://localhost:5000`

### User Guide

-   Get request usages

    -   request with sort and pagination <br />
        `http://localhost:5000?sort[name]=1&page=2`
    -   request by id <br />
        `http://localhost:5000/id/<your id>`
    -   search request <br />
        `http://localhost:5000/search?q=<enter text you want to search>`

-   Create, update and delete requests are controlled by Admin with JWT authentication.

### Deployed API Link

-   Hosting on Heroku.  <br />
    https://arakan-tg-transportation-api.herokuapp.com/
