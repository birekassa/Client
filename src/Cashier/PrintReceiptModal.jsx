// src/components/cashier/PrintReceiptModal.jsx
import React from "react";
import { FaMoneyBillWave, FaUser, FaCalendarAlt, FaHashtag, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const PrintReceiptModal = ({ receipt, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  return (
    <>
      {/* PRINT-ONLY CSS — WORKS ON 58mm/80mm THERMAL PAPER */}
      <style jsx>{`
        @media print {
          @page {
            size: 80mm auto;     /* 80mm thermal paper */
            margin: 5mm !important;
          }
          body * { visibility: hidden; }
          .print-container, .print-container * { visibility: visible; }
          .print-container {
            position: absolute;
            left: 0; top: 0;
            width: 74mm;         /* 80mm - margins */
            font-size: 10pt;
            line-height: 1.3;
          }
          .no-print { display: none !important; }
          .text-6xl { font-size: 28pt !important; }
          .text-5xl { font-size: 22pt !important; }
          .text-3xl { font-size: 16pt !important; }
          .text-2xl { font-size: 14pt !important; }
          .text-xl  { font-size: 12pt !important; }
        }
        @media screen and (max-width: 640px) {
          .print-container { max-width: 90vw; padding: 1rem; }
        }
      `}</style>

      <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50 print:bg-white print:fixed print:inset-0">
        <div className="print-container bg-white rounded-xl shadow-2xl w-full max-w-[80mm] mx-auto overflow-hidden print:max-w-none print:shadow-none print:rounded-none">
          
          {/* GOVERNMENT HEADER */}
          <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-4 px-6 print:py-3 print:px-4">
            <div className="text-center text-xs print:text-[9pt]">
              <h1 className="text-lg font-bold print:text-base">FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA</h1>
              <h2 className="text-sm print:text-xs">AMHARA REGION • WOLDIA CITY</h2>
              <h3 className="text-base font-bold print:text-sm">KEBELE 03</h3>
              <p className="text-xs opacity-90 print:text-[8pt]">Tel: +251-33-551-0123</p>
            </div>
          </div>

          <div className="p-6 print:p-4 bg-gray-50 print:bg-white text-xs print:text-[10pt]">
            <div className="text-center mb-4 border-b-2 border-dashed border-green-700 pb-3">
              <h2 className="text-3xl font-bold text-green-800 print:text-2xl">OFFICIAL RECEIPT</h2>
              <p className="text-sm text-gray-700 print:text-xs">ይፋ ደረሰኝ</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-bold">Receipt No:</span>
                <span className="font-mono font-bold">{receipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between text-right">
                <span className="font-bold">Date/Time:</span>
                <div>
                  <div className="font-mono">{currentDate}</div>
                  <div className="font-mono text-xs">{currentTime}</div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-green-700 pt-3 mt-3">
                <p className="font-bold mb-1">Payer:</p>
                <p className="font-bold text-green-800">{receipt.residentName}</p>
                <p className="text-xs">ID: {receipt.kebeleId}</p>
              </div>

              <div className="bg-green-50 p-3 rounded border-2 border-green-300">
                <p className="font-bold">Service: {receipt.service}</p>
                <p className="font-bold">Method: {receipt.paymentMethod}</p>
                <div className="border-t-2 border-dashed border-green-700 mt-3 pt-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-bold print:text-lg">Amount:</span>
                    <span className="text-4xl font-bold text-green-700 print:text-2xl">
                      ETB {receipt.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-right text-xs print:text-[8pt] mt-1">
                    {receipt.amountWords || "Fifty Ethiopian Birr Only"}
                  </p>
                </div>
              </div>

              <div className="text-center text-xs border-t pt-3 mt-4">
                <p>Thank you!</p>
                <p className="text-[8pt]">Computer-generated • No signature required</p>
                <p className="text-[7pt] mt-2 opacity-70">Kebele Management System • June 2025</p>
              </div>
            </div>

            {/* BUTTONS — HIDDEN WHEN PRINTING */}
            <div className="mt-6 flex justify-center gap-4 no-print">
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2"
              >
                PRINT
              </button>
              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintReceiptModal;