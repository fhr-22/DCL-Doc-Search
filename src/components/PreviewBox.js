import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge.js";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const PreviewBox = ({ doc }) => {
    const [expanded, setExpanded] = useState(false); // Preview box expanded / collapsed
    const [loadError, setLoadError] = useState(false); // Set to true if file couldn't be loaded
    const [parent] = useAutoAnimate() // Parent element for animation

    // stop showing error status and expand, when new document is selected 
    useEffect(() => {
        if (doc) {
            setLoadError(false);
            setExpanded(true);
        }
    }, [doc])

    // convert date object to string with desired format
    const getDateString = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleString('en-US', options).toUpperCase();
    }


    return (
        <div className="box" id="preview" ref={parent} >

            <div className="box-header" >
                <h2>PREVIEW</h2>

                { // Display document title when preview box is collapsed 
                    doc && <h4>{!expanded ? doc.title : ""}</h4>}

                <div>
                    <button
                        onClick={() => setExpanded(!expanded)}>
                        {expanded ? "hide preview" : "expand preview"}
                    </button>
                </div>
            </div>

            {expanded &&
                <div className="preview-container">

                    {doc !== null &&  // Display document details

                        <div className="preview-details">
                            <h3>{doc.title}</h3>
                            <h4>{doc.category.toUpperCase()} • {getDateString(doc.date)}</h4>
                            <h4> {doc.path}</h4>
                            <br />
                            <h5>DESCRIPTION</h5>
                            <p>{doc.desc}</p>
                        </div>
                    }

                    <div className="preview-content ">

                        {   // Blank preview message 
                            (doc === null) &&
                            <StatusBadge
                                text={"select a document to display preview."}
                                color={"powderblue"} />
                        }

                        {   // Preview
                            (doc !== null && !loadError) &&
                            <FileViewer
                                type={doc.category}
                                path={doc.path}
                                onError={() => { setLoadError(true) }}
                            />
                        }

                        {   // Dislpay error message if document couldn't be loaded 
                            loadError && <StatusBadge text={"couldn't load file :("} color={"lightpink"} />}
                    </div>
                </div>
            }
        </div>
    )
}

// Return correct html element based on type
function FileViewer({ type, path, onError }) {
    switch (type) {
        case 'image':
            return (
                <img src={path} onError={onError} />
            );
        case 'video':
            return (
                <video src={path} onError={onError} controls />
            );
        case 'audio':
            return (
                <audio src={path} onError={onError} controls />
            );
        case 'pdf':
            let pdf1 = navigator.mimeTypes['application/pdf'] !== undefined;
            let pdf2 = 'PDF Viewer' in navigator.plugins
            let pdfSupported = pdf1 || pdf2

            if (pdfSupported) {
                return (
                    <embed
                        src={path}
                        style={{ width: '100%', height: '400px' }}></embed>
                )
            }

            else {
                return (
                    <StatusBadge
                        text={"PDF viewer not supported :("}
                        color={"lightpink"} />
                )
            }

        default:
            return (
                <StatusBadge
                    text={"no preview for this document category :("}
                    color={"lightpink"} />
            );
    }
}

export default PreviewBox;