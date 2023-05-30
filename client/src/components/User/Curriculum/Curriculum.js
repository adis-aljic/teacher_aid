import React, { useState } from 'react';
import { Document } from 'pdfjs-dist';
import pdf2json from 'pdf2json';

const Curriculum = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileRead = async () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await Document.load(typedArray);

        const pdfParser = new pdf2json();
        pdfParser.on('pdfParser_dataReady', (pdfData) => {
          const transformedContent = transformContent(pdfData);
          setPdfContent(transformedContent);
        });
        pdfParser.parseBuffer(typedArray);
      };
      fileReader.readAsArrayBuffer(selectedFile);
    }
  };

  const transformContent = (pdfData) => {
    // Perform your desired transformation on the pdfData
    // For example, you can extract specific fields or information from the PDF

    // This is just a simple example - you can modify this according to your needs
    const transformedObject = {
      totalPages: pdfData.numPages,
      textContent: pdfData.formImage.Pages.map((page) => page.Texts.map((text) => text.R[0].T)),
    };

    return transformedObject;
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleFileRead}>Transform File</button>
      {pdfContent && (
        <pre>{JSON.stringify(pdfContent, null, 2)}</pre>
      )}
    </div>
  );
};

export default Curriculum;
