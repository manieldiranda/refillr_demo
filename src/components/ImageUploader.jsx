import React from "react";
import PropTypes from "prop-types";

import { useDropzone } from "react-dropzone";

import "../css/ImageUploader.css";

const ImageUploader = props => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: false,
    onDrop: file => props.selectImage(file)
  });

  return (
    <section className="dropzoneContainer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Click to upload a file</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
    </section>
  );
};

ImageUploader.propTypes = {
  selectImage: PropTypes.func.isRequired
};

export default ImageUploader;
