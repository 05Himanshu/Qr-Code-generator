import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';

const Card = () => {
  const [input, setInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const downloadPDF = () => {
    try {
      setisLoading(true);

      const pdf = new jsPDF();
      pdf.text("QR Code", 50, 50);

      // Use qrcode.react to generate QR code directly in PDF
      const qrCodeDataUrl = document.getElementById('qrcode').toDataURL('image/png');
      pdf.addImage(qrCodeDataUrl, 'PNG', 15, 20, 30, 30);

      pdf.save('label.pdf');
    } catch (error) {
      console.error('Error while generating PDF:', error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form className='form'>
      <h1 className='title'>QR code generator</h1>

      <input
        type='text'
        className='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        placeholder='Enter URL or Text'
      />

      {isLoading && <div className='loading'><span></span>Loading...</div>}
      {!isLoading && (
        input ? (
          <div>
            <QRCode id="qrcode" value={input} />
          </div>
        ) : (
          <div className='loading'>Generate an amazing QR code for you & your friends!</div>
        )
      )}

      <button className='download-btn' onClick={downloadPDF}>
        Download PDF
      </button>
    </form>
  );
};

export default Card;
