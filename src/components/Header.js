const Header = ({ activeBox, onSelect }) => {
    return (
        <nav className="box header">
            <div className="box-header">
                <div>
                    <h1>DOCUMENT SEARCH TOOL</h1>
                    <p> by Farhan Rahaman (KU-CS)</p>
                </div>
                <div >
                    <button onClick={() => { onSelect("import") }} disabled={activeBox === "import"}>
                        import list
                    </button>
                    <button onClick={() => onSelect("details")} disabled={activeBox === "details"}>
                        details
                    </button>
                </div>
            </div>
        </nav >
    )
}

export default Header