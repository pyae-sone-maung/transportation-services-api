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

 #### Example of API Response:
  ```javascript
  {
            "_id": "625eea3641c0501bd76c1248",
            "name": "ရွှေပြည်တန်",
            "service": "ခရီးသည် နှင့် ကုန်စည် ပို့ဆောင်ရေး",
            "routes": [
                "တောင်ကုတ်",
                " ကျောက်နီမော်",
                " ရမ်းဗြဲ",
                " ကျောက်ဖြူ",
                " တောင်ရှည်",
                " မြေပုံ",
                " စစ်တွေ"
            ],
            "vehical_type": "Ship",
            "phone": [
                "09-44488001 (တောင်ကုတ်)",
                " 09-421727744 (တောင်ကုတ်)",
                " 09-449777709 (စစ်တွေ)",
                " 09-49674569 (စစ်တွေ)"
            ],
            "address": "တောင်ကုတ်-ပြည် လမ်း၊ ရွှေပြည်တန် သင်္ဘောဆိပ်။",
            "note": "တောင်ကုတ် မှ စစ်တွေ ခရီးစဉ်များကို အပတ်စဉ် ဗုဒ္ဓဟူးနေ့ နှင့် စနေနေ့ များတွင် နံနက်  (၆:၀၀) နာရီ မှစတင်ထွက်ခွာသည်။",
            "image": {
                "image_id": "Taungup-City/fqi6vt2vlsp330hv7gsz",
                "image_url": "http://res.cloudinary.com/blackmango/image/upload/v1651683457/Taungup-City/fqi6vt2vlsp330hv7gsz.jpg"
            }
        }
  ```

### Deployed API Link

-   Hosting on Heroku.  <br />
    https://arakan-tg-transportation-api.herokuapp.com/
