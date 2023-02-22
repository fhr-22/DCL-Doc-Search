import { useState } from "react"
import { exampleList, copyExampleToClipboard } from "./utils.js";

const DetailsBox = ({ closeClicked }) => {

    const [copyButtonText, setCopyButtonText] = useState("copy example");

    const copyExample = (e) => {
        if (copyExampleToClipboard()) {
            setCopyButtonText("copied!")
        }
        else {
            setCopyButtonText("failed to copy :(")
        }
    }

    return (

        <div className="box" >
            <div className="box-header">
                <h2 >DETAILS</h2>
                <div>
                    <button className="closebutton" onClick={() => closeClicked(null)}>X</button>
                </div>
            </div>

            <div id="categories">

                <div className="category">
                    <p>
                        Submission for DETS Coding Club - <br /> Web app for searching/filtering documents from a pre-made .json list.
                        <br /><br />
                        To start searching, click the <span className="grey">import list</span> button and paste a valid list (or use the provided example list).
                        <br /><br />
                        Built using <a href="https://reactjs.org/" target="_blank">React</a> and <a href="https://auto-animate.formkit.com/" target="_blank">AutoAnimate</a>.
                    </p>
                </div>


                <div className="category">
                    <p>Example list •&nbsp;
                        <button style={{ fontSize: "0.85em" }}
                            onClick={copyExample} >
                            {copyButtonText}
                        </button>
                    </p>
                    <pre><code>{exampleList}</code></pre>
                </div>

            </div>
        </div>
    )
}

export default DetailsBox