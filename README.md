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

 #### Exemplo de retorno válido da API:
  ```javascript
  {
            "_id": "625c3ca6345e370034c80d54",
            "name": "အန်တီ၀င်း",
            "service": "အဆင့်မြင့်ခရီးသည် ပို့ဆောင်ရေး",
            "routes": [
                "ရန်ကုန်",
                " တောင်ကုတ်",
                " ကျောက်ဖြူ",
                " သံတွဲ(ငပလီ)",
                " မာန်အောင်",
                " စစ်တွေ",
                " ထား၀ယ်",
                " မြိတ်",
                " တနင်္သာရီ",
                " ဘုတ်ပြင်း",
                " ကော့သောင်း"
            ],
            "vehical_type": "Bus",
            "phone": [
                " 09-894342299",
                " 09-894342288",
                " 09-894342211",
                " 09-894342277"
            ],
            "address": "အေးရိပ်ငြိမ် အ၀ေးပြေးကား၀င်း",
            "note": "",
            "image": {
                "image_id": "Taungup-City/ywv3v3it6lprh1m0dntx",
                "image_url": "http://res.cloudinary.com/blackmango/image/upload/v1651683302/Taungup-City/ywv3v3it6lprh1m0dntx.jpg"
            }
        }
  ```

### Deployed API Link

-   Hosting on Heroku.  <br />
    https://arakan-tg-transportation-api.herokuapp.com/
