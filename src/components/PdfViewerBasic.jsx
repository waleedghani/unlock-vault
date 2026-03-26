import React from "react";
import PDFViewer from "pdf-viewer-reactjs";

const MyPdfViewer = ({ url }) => <PDFViewer document={{ url }} />;

export default MyPdfViewer;
