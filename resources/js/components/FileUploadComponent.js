import React, { Component } from 'react';

import axios, { post } from 'axios';
//import React from 'react';
import ReactDOM from 'react-dom';

export default class FileUploadComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault()
        this.fileUpload(this.state.image);
    }
    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }
    fileUpload(image) {
        const url = 'http://localhost:8000/api/fileupload';
        const formData = { file: this.state.image }
        return post(url, formData)
            .then(response => console.log(response))
    }



    render() {
        return (

            <form onSubmit={this.onFormSubmit}>
        <h1>React js Laravel File Upload Tutorial</h1>
        <input type="file"  onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      
        )
    }
}


// DOM element
if (document.getElementById('mFileUploadComponent')) {
    ReactDOM.render(<FileUploadComponent />, document.getElementById('mFileUploadComponent'));
}


/*       <div class="card mb-3" >
                <div class="card-body">
                    <form onSubmit={this.onFormSubmit}>
                        <h1>File Upload</h1>

                        <div class="input-group mb-3">
                            <select class="custom-select" id="type">
                                <option selected>Choose...</option>
                                <option value="1">Origonal</option>
                                <option value="2">Square Origonal</option>
                                <option value="3">Small 256x256</option>
                                <option value="4">All three size</option>
                            </select>
                            <div class="input-group-append">
                                <label class="input-group-text" for="type">Type</label>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="image" accept="image/*"/>
                                <label class ="custom-file-label" for="image" onChange={this.onChange}>Choose photo</label>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>

                </div>
            </div> */