# DCL - Document Search Tool

[Demo](https://fhr-22.github.io/DCL-Doc-Search/)

**Submission for DETS Coding Leage (Tier 2) - by Farhan R. (DCSE, 1st Year)**

Web app for searching/filtering document details from a pre-made `.json` list.


### Features

- Search in title / description, with support for regex
- Filter by date range / document type
- Previews for supported document types

### Document List Format
```
[
    {
        "title": "Document name",
        "desc" : "description contents",
        "date" : "2023-01-30",
        "type" : "image",
        "path" : "htpps://example.com/picture.jpg"
    },
    ....
]
````
**Valid categories:** image • audio • video • PDF • other

**Date format:** YYYY-MM-DD

***


Built using [React](https://github.com/facebook/react) and [AutoAnimate](https://github.com/formkit/auto-animate). 

