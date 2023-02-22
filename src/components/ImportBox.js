import { useState } from "react"
import StatusBadge from "./StatusBadge.js";
import { docTypes } from "./utils.js";

const ImportBox = ({ closeClicked, onValidImport, numDocs, updateDateRange }) => {

    const [boxText, setBoxText] = useState("") // Textarea contents

    // Initial props for statusBadge
    let initBadge = ["no list imported yet.", "powderblue"]
    if (numDocs !== 0) { initBadge = [`${numDocs} item${numDocs > 1 ? "s" : ""} imported previously`, "#AFE1AF"] }

    // initialize + keep track of statusBadge props
    const [badgeContent, setBadgeContent] = useState(initBadge);


    // Validation func for individual document list item
    const validateListItem = (doc) => {

        // Check if object has required keys
        const items = ["title", "desc", "date", "category", "path"]
        const hasKeys = items.every((key) => {
            return (doc.hasOwnProperty(key) &&
                typeof doc[key] === 'string' &&
                doc[key].trim().length > 0)
        })

        // Check if document category is one one of supported categories
        let hasValidCategory = docTypes.includes(doc.category.toLowerCase());
        let hasValidDate = !isNaN(Date.parse(doc.date));

        return hasValidCategory && hasValidDate && hasKeys
    }

    // Validate input from textarea
    const onButtonClick = () => {
        const text = boxText.replace(/\\/g, "\\\\");
        let inputIsValid = false;
        let docList;

        try {
            docList = JSON.parse(text)

            //Check if all elements of input json are valid
            if (Array.isArray(docList) && docList.length > 0 && docList.every(validateListItem)) {
                inputIsValid = true;
            }
        } catch (err) { console.log(err) }

        if (inputIsValid) {

            // Append unique key for react use, convert date string into date object
            let id = 1;
            docList.forEach(doc => {
                doc.id = id++;
                doc.date = new Date(doc.date);
            })

            // Find earliest and latest dates and update them in searchbox with provided callback
            let rangeStart = new Date(Math.min(...docList.map(e => new Date(e.date))));
            let rangeEnd = new Date(Math.max(...docList.map(e => new Date(e.date))));
            updateDateRange([rangeStart, rangeEnd])

            // update document list in parent component, update badge
            onValidImport(docList);
            setBadgeContent([`${docList.length} item${docList.length > 1 ? "s" : ""} imported :)`, "#AFE1AF"])
        }
        else { setBadgeContent(["invalid list :(", "lightpink"]) }
    }



    return (
        < div className="box" >
            <div className="box-header">
                <h2>IMPORT LIST</h2>
                <div>
                    <button className="closebutton" onClick={() => { closeClicked(null) }}>X</button>
                </div>
            </div>

            <div id="categories">

                <div className="category">
                    <p>
                        Required keys: <br />
                        <span className="grey">title</span> • <span className="grey">desc</span> • <span className="grey">date</span> • <span className="grey">category</span> • <span className="grey">path</span>
                        <br /><br />


                        Valid categories: <br />
                        <span className="grey">image</span> • <span className="grey">audio</span> • <span className="grey">video</span> • <span className="grey">PDF</span> • <span className="grey">other</span>
                        <br /><br />

                        Date format: <span className="grey">YYYY-MM-DD</span>
                        <br /><br />
                    </p>

                    <p>Paths: <span className="grey">URLs</span> work everywhere,  <span className="grey">local file paths</span> work if you're running this as a locally downloaded HTML file</p>

                    <br />
                </div>

                <div className="category">
                    <label>paste your .json list here <textarea value={boxText} onChange={(e) => setBoxText(e.target.value)} ></textarea></label>
                    <div className="box-header">
                        <button
                            onClick={onButtonClick}>
                            import
                        </button>
                        <div >
                            <StatusBadge text={badgeContent[0]} color={badgeContent[1]} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ImportBox;

