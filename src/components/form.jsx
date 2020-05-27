import React from 'react';

const Form = (props) => {
    return(
        <div className="form">
                <div className="form__inputs">
                {/* Input for the text at the top */}
                    <input
                        name="text-top"
                        placeholder="Top Text"
                        type="text"
                        value={props.textTop}
                        onChange={props.handleInputChange}
                        />

                    <input
                        name="text-bottom"
                        placeholder="Bottom Text"
                        type="text"
                        value={props.textBottom}
                        onChange={props.handleInputChange}
                        />
                </div>
                <div className="form__btns">
                    {/* Button to load random image from api.imgflip.com*/}
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={props.handleImageChange}
                    >
                        Change Image
                    </button>

                    {/* Button to load image from disk */}
                    <label
                        className="btn btn-primary"
                        htmlFor="fileInput"
                    >
                        Load image
                        <input id="fileInput" name="fileInput" type="file"
                            accept=".jpg, .jpeg, .png" onChange={props.handleImageInputChange} hidden />
                    </label>

                    {/* Button to generate png image of the meme */}
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={props.handleMemeGeneration}
                    >
                        Generate Meme
                    </button>

                    {/* Button to remove the meme image from the DOM */}
                    {props.isMemeGenerated && <button 
                        className="btn btn-danger"
                        type="button"
                        onClick={props.handleMemeReset} 
                        >
                        Reset
                        </button>}
                </div>
            </div>
    )
}

export default Form;
