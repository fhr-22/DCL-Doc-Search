import React, { useEffect, useState } from "react";
import DetailsBox from ".//components/DetailsBox.js";
import Header from ".//components/Header.js";
import ImportBox from ".//components/ImportBox.js";
import PreviewBox from ".//components/PreviewBox.js";
import SearchBox from ".//components/SearchBox.js";
import ResultsBox from ".//components/ResultsBox.js";
import { defaultFilter } from ".//components/utils.js";
import { useAutoAnimate } from '@formkit/auto-animate/react'


const ParentComponent = () => {
  const [documents, setDocuments] = useState([]); // List of imported documents
  const [filter, setFilter] = useState(defaultFilter); // Search parameters
  const [inPreview, setInPreview] = useState(null);  // Document being previewed currently 
  const [openBox, setOpenBox] = useState(null); // Current popup that is opened from header, either null/details/import
  const [results, setResults] = useState([]); // List of filtered documents
  const [parent] = useAutoAnimate(); // Parent element for animating popup entry/exit


  // Decides if the document provided matches search params
  const matchesFilter = (doc) => {

    let [titleIncluded, descIncluded] = [false, false]

    // If Regex 
    if (filter.regex) {
      try {
        const titleRegex = new RegExp(filter.title);
        titleIncluded = titleRegex.test(doc.title);

        const descRegex = new RegExp(filter.desc);
        descIncluded = descRegex.test(doc.desc)
      }
      catch (e) { console.log(e) }
    }

    else {
      titleIncluded = doc.title.toLowerCase().includes(filter.title.toLowerCase())
      descIncluded = doc.desc.toLowerCase().includes(filter.desc.toLowerCase())
    }

    const date = doc.date.getTime()
    const isInDateRange = filter.start.getTime() <= date && date <= filter.end.getTime()
    const isInTypeList = filter.categories.includes(doc.category)
    return titleIncluded && descIncluded && isInDateRange && isInTypeList
  }

  // Update results list when docs list is imported or search params change
  useEffect(() => {
    setResults(documents.filter(matchesFilter))
  }, [filter, documents])

  // Updates filter dates (to update searchbox after list is imported)
  const updateDateRange = (newDateRange) => {
    let newFilter = filter;
    [newFilter.start, newFilter.end] = newDateRange
    setFilter(newFilter);
    setInPreview(null); // Remove preview doc since new list has been imported
  }

  // Add event listener to close popup box if Esc is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { setOpenBox(null); console.log("ESCAPE") }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div ref={parent}>
      <Header activeBox={openBox} onSelect={setOpenBox} />

      {openBox === "details" &&
        <DetailsBox closeClicked={setOpenBox} />
      }

      {openBox === "import" &&
        <ImportBox
          closeClicked={setOpenBox}
          onValidImport={setDocuments}
          updateDateRange={updateDateRange}
          numDocs={documents.length} />
      }

      <SearchBox
        disabled={documents.length > 0 ? false : true}
        filter={filter}
        setFilter={setFilter}
        matchCount={results.length} />

      <PreviewBox
        doc={inPreview} />

      <ResultsBox
        docs={results}
        selectDoc={setInPreview}
        disabled={documents.length > 0 ? false : true} />

      <br /><br />

    </div>
  );
};

export default ParentComponent;
