# DCL - Document Search Tool

[Demo](https://ww.google.com)

Submission for DETS Coding Leage (Tier 2) : Web app for searching/filtering document details from a pre-made `.json` list.

**by Farhan R. (DCSE, 1st Year)**

### Features

- Search in titles and descriptions, with support for regex
- Filter by date range and document type
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


Built using [React]() and [AutoAnimate](). 

