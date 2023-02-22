const ResultItem = ({ doc, select, onClick }) => {

    const getDateString = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleString('en-US', options).toUpperCase();

    }

    return (
        <div
            className="result"
            onClick={() => {
                select(doc);
                document.querySelector('#preview').scrollIntoView({ behavior: "smooth" });
            }}>
            <h3>{doc.title} </h3>
            <h4>
                {doc.category.toUpperCase()}  •  {getDateString(doc.date)}
            </h4>
            <p>{doc.desc}</p>
        </div >
    )
}
export default ResultItem