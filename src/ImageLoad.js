import React from 'react';
import classes from '../src/ImageLoad.module.css'

const imageLoader = (props) => {
    return (
        <div className={classes.MainClass}>
        <h2>Quote Reader</h2>
        <h3>Upload an image and convert in into text</h3>
            <div className={classes.ContentContainer}>
                <img className={classes.PreviewImage} src={props.imageInfo.image}/>
                <h1>{props.imageInfo.imagePreview}</h1>
                <input type="file" onChange={props.imageUpload}/>
                <p>{props.imageInfo.defaultStatus}</p>
                <button disabled={props.imageInfo.loading} onClick={props.extractText}>
                Extract Text
                </button>
             </div>
    <div className={classes.ContentContainer}>
        <textarea disabled type="text" rows="20" cols="50" value={props.imageInfo.detectedText}></textarea>
        <div>
            <label><strong> Detected Language :{props.imageInfo.detectedTextLanguage}</strong></label>
        </div>
    </div>
    </div>
        )
} 

export default imageLoader;