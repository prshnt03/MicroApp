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
        console.log('default--2')
    }
    onFormSubmit(e) {
        console.log('onFormSubmit--1')
        e.preventDefault()
        this.fileUpload(this.state.image);
    }
    onChange(e) {
        console.log('onChange--2')
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        console.log('createImage--2')
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }
    fileUpload(image) {
        
        console.log('fileUpload--3')
        const url = 'http://localhost:8000/api/fileupload';
        const formData = { file: this.state.image }
        return post(url, formData)
            .then(response => console.log(response))
    }



    render() {
        return (
            <div class="card mb-3" >
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
                                <input type="file" class="custom-file-input" id="image" accept="image/*"  onChange={this.onChange}/>
                                <label class ="custom-file-label" for="image">Choose photo</label>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>

                </div>
            </div>
      
        )
    }
}


// DOM element
if (document.getElementById('mFileUploadComponent')) {
    ReactDOM.render(<FileUploadComponent />, document.getElementById('mFileUploadComponent'));
}