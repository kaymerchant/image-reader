import React,{Component} from 'react';
import ImageLoader from '../src/ImageLoad'
import Axios from 'axios';

class ComputerVision extends Component {
    state = {
        loading : true,
        detectedTextLanguage : null,
        selectedFile: null,
        imageSize: 4 * 1024 * 1024,
        defaultStatus: "Maximum size allowed for the image is 4 MB",
        isValid: false,
        imageData: null,
        image: null,
        languageOptions: [],
        detectedText: "Text will be displayed here"
    }

    uplaodImage = (event) => {
        let imageInformation = event.target.files[0];
        console.log(imageInformation)
        console.log(this.state.selectedFile)
        if(imageInformation === undefined) {
            return;
        }
        else if(this.state.selectedFile !== null && this.state.selectedFile!== imageInformation) {
            this.setState({ image: null, 
                isValid : false,
                loading : false,
                selectedFile: null,
            })
        }

        if(this.state.imageSize < imageInformation.size) {
            this.setState({ defaultStatus: 
                `The file size is ${this.state.imageSize} bytes, this is more than the allowed limit of ${imageInformation.size} bytes.`,
            isValid : false})
        }
        else if (imageInformation.type.indexOf('image') === -1) {
            this.setState({defaultStatus:"Please upload a valid image file", isValid : false})
        }
        else {
            let imageSrc = URL.createObjectURL(event.target.files[0])
            this.setState({ image: imageSrc, 
                isValid : true,
                loading : false,
                selectedFile: imageInformation,
                detectedText:"..loading"})
                this.getLanguage()
        }
    }

    getLanguage = () => {
        Axios.get("https://ngcomputervision20200524213946.azurewebsites.net/api/OCR")
        .then(response => {
            this.setState({languageOptions: response.data})
        })
    }

    getText = () => {
       
        let imageDetails = new FormData()
        imageDetails.append('imageDetails', this.state.selectedFile)
        if(this.state.isValid) {
            this.setState({
                imageData: imageDetails
            })          

            Axios.post("https://ngcomputervision20200524213946.azurewebsites.net/api/OCR", imageDetails)
            .then(response => {
                return (
                    this.state.languageOptions.map(lang => {
                    if(lang.languageID === response.data.language) {
                        this.setState({detectedTextLanguage: lang.languageName.toUpperCase(),
                            detectedText : response.data.detectedText})
                    }
                    else {
                        this.setState({detectedTextLanguage: "NONE",
                            detectedText : "Language not detected. Try again!"})
                    }
                    }),
                    console.log(this.state)
                )
            })
        }
    }

    render() {
        return (
            <div>
                <ImageLoader 
                imageInfo={this.state}
                extractText={this.getText}
                imageUpload={this.uplaodImage}/>
            </div>
        )
    }
}

export default ComputerVision