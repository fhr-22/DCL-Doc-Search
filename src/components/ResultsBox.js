import ResultItem from "./ResultItem";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const ResultsBox = ({ docs, selectDoc, disabled }) => {

    const headerText = (docs.length === 0) ? "NO RESULTS." : `RESULTS (${docs.length})`;

    const [parent] = useAutoAnimate()

    return (
        <div className="box">

            <div className="box-header">
                <h2>{headerText}</h2>
            </div>

            <div className="results-container" ref={parent}>
                {docs.map((document) => (
                    <ResultItem
                        key={document.id}
                        doc={document}
                        select={selectDoc}
                    />
                ))}

                {(docs.length === 0) && !disabled ? "Try changing your query." : ""}
                {disabled ? "Import a list to start searching." : ""}
            </div>
        </div >
    )
}

export default ResultsBox;