import React, { useRef, useState } from 'react';
import QrScanner from 'qr-scanner'; // 📦 install with: npm install qr-scanner

const QRScanAndPay = () => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  const startScan = async () => {
    setError('');
    setScanning(true);

    try {
      const scanner = new QrScanner(videoRef.current, (result) => {
        if (result?.data?.startsWith('upi://')) {
          window.location.href = result.data; // 🔁 Redirect to UPI app
          scanner.stop();
          setScanning(false);
        } else {
          setError('Not a valid UPI QR');
        }
      });

      await scanner.start();
    } catch (err) {
      console.error(err);
      setError('Camera access failed or not supported.');
      setScanning(false);
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Scan UPI QR to Pay</h2>

      {!scanning ? (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={startScan}
        >
          Scan QR Code
        </button>
      ) : (
        <>
          <video ref={videoRef} className="w-full max-w-md mx-auto rounded" />
          <p className="mt-2 text-gray-600">Scanning...</p>
        </>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default QRScanAndPay;
