import { useState, useEffect } from "react";
import { docTypes } from "./utils.js";
import StatusBadge from "./StatusBadge.js";

const SearchBox = ({ disabled, filter, setFilter, matchCount }) => {

    const [badgeContent, setBadgeContent] = useState(["import list to start searching", "powderblue"])

    // Update status if count changes
    useEffect(() => {
        if (!disabled) {
            if (matchCount === 0) {
                setBadgeContent(["no matches :(", "lightpink"])
            }
            else if (matchCount === 1) {
                setBadgeContent(["1 match found", "#AFE1AF"])
            }
            else {
                setBadgeContent([`${matchCount} matches found`, "#AFE1AF"])
            }
        }
    }, [disabled, matchCount])



    // Handle updating and building up object containing search params
    const update = (param, value) => {
        setFilter({ ...filter, [param]: value })
    }

    // utility function for updating list of categories in filter
    function toggleInList(list, value) {
        const newList = list.filter((item) => item !== value);
        if (newList.length === list.length) {
            newList.push(value);
        }
        return newList;
    }

    return (

        < div className="box" id="search" >
            <div className="box-header">
                <h2 >SEARCH</h2>
                <StatusBadge text={badgeContent[0]} color={badgeContent[1]} />
            </div>

            <div id="categories" >
                <div className="category">

                    <label>TITLE</label>
                    <input
                        type="text"
                        disabled={disabled}
                        onChange={e => { update("title", e.target.value) }} />
                    <label>DESCRIPTION </label>
                    <input
                        type="text"
                        disabled={disabled}
                        onChange={e => { update("desc", e.target.value) }} />
                    <input
                        id="regex"
                        type="checkbox"
                        disabled={disabled}
                        onChange={e => { update("regex", e.target.checked) }} />
                    <label htmlFor="regex"> regular exp.</label>

                </div>
                <div className="category">
                    <label>DATE: START</label>
                    <input
                        type="date"
                        value={filter.start ? filter.start.toISOString().substr(0, 10) : ""}
                        onChange={e => { update("start", new Date(e.target.value)) }}
                        disabled={disabled} />
                    <label>DATE: END </label>
                    <input
                        type="date"
                        value={filter.end ? filter.end.toISOString().substr(0, 10) : ""}
                        onChange={e => { update("end", new Date(e.target.value)) }}
                        disabled={disabled} />

                </div>
                <div className="category checklist">
                    <label>CATEGORIES</label>
                    {docTypes.map((type) => (
                        <div key={type}>
                            <input
                                type="checkbox"
                                id={type}
                                disabled={disabled}
                                checked={filter.categories.includes(type)}
                                onChange={e => {
                                    update("categories", toggleInList(filter.categories, e.target.id))
                                }} />
                            <label htmlFor={type}> {type}</label>
                        </div>

                    ))}
                </div>
            </div>
        </div >)
}

export default SearchBox;
