// src/SocialJustice/components/cases/ConfirmationSheet.jsx
import React, { useState } from 'react';
import { FaPrint, FaDownload, FaEnvelope, FaCheckCircle, FaCopy, FaShare, FaSearch, FaUser, FaPhone, FaCalendar, FaFileAlt } from 'react-icons/fa';

const ConfirmationSheet = () => {
  const [selectedConfirmation, setSelectedConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock confirmed cases data
  const [confirmedCases, setConfirmedCases] = useState([
    {
      id: 1,
      caseNumber: 'CASE-2024-001',
      applicantName: 'John Doe',
      applicantId: 'ID-123456',
      contactNumber: '+251 91 234 5678',
      caseType: 'Property Dispute',
      dateApproved: '2024-01-16',
      approvedBy: 'Council Member A',
      confirmationNumber: 'CONF-2024-001',
      status: 'issued',
      letterContent: `OFFICE OF SOCIAL JUSTICE COUNCIL
CONFIRMATION LETTER

Case Number: CASE-2024-001
Applicant: John Doe
ID Number: ID-123456

This letter confirms that your case regarding "Property Dispute" has been reviewed and approved by the Social Justice Council on January 16, 2024.

The council has found merit in your application and recommends the following course of action:
1. Mediation session with involved parties
2. Property boundary verification by certified surveyor
3. Follow-up review in 30 days

Please present this confirmation letter when attending scheduled sessions.

For the Social Justice Council,
Council Member A
Head of Case Review
`
    },
    {
      id: 2,
      caseNumber: 'CASE-2024-002',
      applicantName: 'Jane Smith',
      applicantId: 'ID-234567',
      contactNumber: '+251 92 345 6789',
      caseType: 'Family Matter',
      dateApproved: '2024-01-15',
      approvedBy: 'Council Member B',
      confirmationNumber: 'CONF-2024-002',
      status: 'pending_delivery',
      letterContent: `OFFICE OF SOCIAL JUSTICE COUNCIL
CONFIRMATION LETTER

Case Number: CASE-2024-002
Applicant: Jane Smith
ID Number: ID-234567

This letter confirms that your case regarding "Family Matter - Inheritance Distribution" has been reviewed and approved by the Social Justice Council on January 15, 2024.

The council recommends:
1. Family mediation session
2. Legal consultation for inheritance laws
3. Documentation review by council legal team

Your case will be monitored for 60 days to ensure proper resolution.

For the Social Justice Council,
Council Member B
Head of Family Affairs
`
    },
    {
      id: 3,
      caseNumber: 'CASE-2024-003',
      applicantName: 'Robert Johnson',
      applicantId: 'ID-345678',
      contactNumber: '+251 93 456 7890',
      caseType: 'Labor Issue',
      dateApproved: '2024-01-14',
      approvedBy: 'Council Member C',
      confirmationNumber: 'CONF-2024-003',
      status: 'delivered',
      letterContent: `OFFICE OF SOCIAL JUSTICE COUNCIL
CONFIRMATION LETTER

Case Number: CASE-2024-003
Applicant: Robert Johnson
ID Number: ID-345678

This letter confirms that your case regarding "Labor Issue - Unfair Dismissal" has been reviewed and approved by the Social Justice Council on January 14, 2024.

The council has determined that your case warrants further investigation and recommends:
1. Review of employment termination circumstances
2. Potential reinstatement or compensation
3. Workplace rights education for employer

Please contact our office to schedule your next appointment.

For the Social Justice Council,
Council Member C
Head of Labor Relations
`
    }
  ]);

  const filteredConfirmations = confirmedCases.filter(confirmation =>
    confirmation.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    confirmation.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    confirmation.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    if (selectedConfirmation) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Confirmation Letter - ${selectedConfirmation.confirmationNumber}</title>
            <style>
              body { font-family: 'Georgia', serif; margin: 40px; line-height: 1.6; color: #333; }
              .header { text-align: center; margin-bottom: 40px; border-bottom: 3px double #333; padding-bottom: 30px; }
              .content { white-space: pre-line; margin: 30px 0; font-size: 18px; }
              .footer { margin-top: 50px; border-top: 1px solid #333; padding-top: 20px; text-align: center; font-style: italic; }
              .official-stamp { color: #990000; font-weight: bold; margin-top: 20px; }
              @media print { body { margin: 20px; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>OFFICE OF SOCIAL JUSTICE COUNCIL</h1>
              <h2>OFFICIAL CONFIRMATION LETTER</h2>
            </div>
            <div class="content">${selectedConfirmation.letterContent}</div>
            <div class="footer">
              <div class="official-stamp">OFFICIAL DOCUMENT - ${selectedConfirmation.confirmationNumber}</div>
              <p>Issued electronically on: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = () => {
    if (selectedConfirmation) {
      alert(`Downloading confirmation letter: ${selectedConfirmation.confirmationNumber}`);
      // In a real application, this would generate and download a PDF
    }
  };

  const handleSendEmail = () => {
    if (selectedConfirmation) {
      const email = prompt('Enter recipient email address:');
      if (email) {
        alert(`Confirmation letter sent to: ${email}`);
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (selectedConfirmation) {
      navigator.clipboard.writeText(selectedConfirmation.letterContent);
      alert('Confirmation letter copied to clipboard!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'issued': return 'bg-green-500 text-white border-green-600';
      case 'pending_delivery': return 'bg-yellow-500 text-white border-yellow-600';
      case 'delivered': return 'bg-blue-500 text-white border-blue-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'issued': return <FaCheckCircle className="text-white" />;
      case 'pending_delivery': return <FaFileAlt className="text-white" />;
      case 'delivered': return <FaEnvelope className="text-white" />;
      default: return <FaFileAlt className="text-white" />;
    }
  };

  const getCardColor = (status) => {
    switch (status) {
      case 'issued': return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
      case 'pending_delivery': return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200';
      case 'delivered': return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getConfirmationNumberColor = (status) => {
    switch (status) {
      case 'issued': return 'text-green-700 bg-green-200';
      case 'pending_delivery': return 'text-yellow-700 bg-yellow-200';
      case 'delivered': return 'text-blue-700 bg-blue-200';
      default: return 'text-gray-700 bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirmation Sheets</h2>
              <p className="text-gray-700 max-w-2xl">
                Issue and manage confirmation letters for approved cases. Generate official documents for applicants with professional templates.
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white rounded-xl p-4 border border-green-200 shadow-md">
              <div className="text-sm text-green-700 font-medium">Total Confirmations</div>
              <div className="text-2xl font-bold text-green-800">{confirmedCases.length}</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-purple-500" />
              </div>
              <input
                type="text"
                placeholder="Search confirmations by case number, applicant, or confirmation number..."
                className="block w-full pl-10 pr-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-lg font-semibold text-purple-700 bg-white px-4 py-3 rounded-xl border border-purple-200 shadow-sm">
              {filteredConfirmations.length} confirmation(s)
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl border border-purple-300 p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-purple-700">
              {confirmedCases.length}
            </div>
            <div className="text-sm text-purple-800 font-medium mt-2">Total Confirmations</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl border border-green-300 p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-green-700">
              {confirmedCases.filter(c => c.status === 'issued').length}
            </div>
            <div className="text-sm text-green-800 font-medium mt-2">Issued</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl border border-yellow-300 p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-yellow-700">
              {confirmedCases.filter(c => c.status === 'pending_delivery').length}
            </div>
            <div className="text-sm text-yellow-800 font-medium mt-2">Pending Delivery</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl border border-blue-300 p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-blue-700">
              {confirmedCases.filter(c => c.status === 'delivered').length}
            </div>
            <div className="text-sm text-blue-800 font-medium mt-2">Delivered</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Confirmations List */}
          <div className="xl:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Confirmed Cases</h3>
            
            {filteredConfirmations.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-300 shadow-lg">
                <FaCheckCircle className="text-gray-400 text-5xl mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No confirmations found</h4>
                <p className="text-gray-600">No confirmation letters match your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredConfirmations.map((confirmation) => (
                  <div
                    key={confirmation.id}
                    className={`rounded-2xl border-2 transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${
                      selectedConfirmation?.id === confirmation.id 
                        ? 'border-green-500 shadow-lg' 
                        : 'border-gray-300 shadow-md'
                    } ${getCardColor(confirmation.status)}`}
                    onClick={() => setSelectedConfirmation(confirmation)}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-sm font-bold px-3 py-1 rounded-lg ${getConfirmationNumberColor(confirmation.status)}`}>
                          {confirmation.confirmationNumber}
                        </span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(confirmation.status)}
                          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(confirmation.status)}`}>
                            {confirmation.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{confirmation.applicantName}</h4>
                          <p className="text-sm text-gray-700 font-medium">{confirmation.caseType}</p>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Case: {confirmation.caseNumber}</span>
                          <span className="flex items-center space-x-1">
                            <FaCalendar className="h-3 w-3" />
                            <span>{confirmation.dateApproved}</span>
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-600 flex items-center space-x-1">
                          <FaUser className="h-3 w-3" />
                          <span>By: {confirmation.approvedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirmation Details and Letter */}
          <div className="xl:col-span-3">
            {selectedConfirmation ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Header with Actions */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">Confirmation Letter</h3>
                      <p className="text-green-200 mt-1">
                        {selectedConfirmation.confirmationNumber} • For case: {selectedConfirmation.caseNumber}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                      <button
                        onClick={handleCopyToClipboard}
                        className="flex items-center space-x-2 px-4 py-2 text-sm bg-white/20 text-white hover:bg-white/30 rounded-xl transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        <FaCopy className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={handleSendEmail}
                        className="flex items-center space-x-2 px-4 py-2 text-sm bg-white/20 text-white hover:bg-white/30 rounded-xl transition-colors duration-200"
                        title="Send via email"
                      >
                        <FaEnvelope className="h-4 w-4" />
                        <span>Email</span>
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        className="flex items-center space-x-2 px-4 py-2 text-sm bg-white/20 text-white hover:bg-white/30 rounded-xl transition-colors duration-200"
                        title="Download PDF"
                      >
                        <FaDownload className="h-4 w-4" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={handlePrint}
                        className="flex items-center space-x-2 px-4 py-2 text-sm bg-white text-green-700 hover:bg-green-50 font-semibold rounded-xl transition-colors duration-200 shadow-lg"
                        title="Print letter"
                      >
                        <FaPrint className="h-4 w-4" />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Letter Content */}
                <div className="p-6 space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-300 rounded-2xl p-8 shadow-inner">
                    <div className="whitespace-pre-line text-gray-800 font-serif leading-relaxed text-xl">
                      {selectedConfirmation.letterContent}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-5 border border-blue-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <FaUser className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-blue-900 text-lg">Delivery Information</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-blue-800 font-medium">Applicant:</span>
                          <span className="text-blue-900 font-semibold">{selectedConfirmation.applicantName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-800 font-medium">Contact:</span>
                          <span className="text-blue-900 flex items-center space-x-1">
                            <FaPhone className="h-3 w-3" />
                            <span>{selectedConfirmation.contactNumber}</span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-800 font-medium">ID Number:</span>
                          <span className="text-blue-900">{selectedConfirmation.applicantId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-5 border border-green-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-500 p-2 rounded-lg">
                          <FaFileAlt className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-green-900 text-lg">Case Information</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-800 font-medium">Case Type:</span>
                          <span className="text-green-900">{selectedConfirmation.caseType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-800 font-medium">Approved By:</span>
                          <span className="text-green-900">{selectedConfirmation.approvedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-800 font-medium">Approval Date:</span>
                          <span className="text-green-900 flex items-center space-x-1">
                            <FaCalendar className="h-3 w-3" />
                            <span>{selectedConfirmation.dateApproved}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-5 border border-yellow-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-yellow-500 p-2 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-yellow-900 text-lg">Next Steps</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-yellow-900">
                      <li>Deliver confirmation letter to applicant within 3 business days</li>
                      <li>Schedule follow-up appointment if required by case resolution plan</li>
                      <li>Update case status in the central database system</li>
                      <li>Archive all case documents in secure storage</li>
                      <li>Notify relevant departments about case resolution</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-300 shadow-lg p-12 text-center">
                <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-white text-4xl" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Select a Confirmation</h4>
                <p className="text-gray-700 max-w-md mx-auto text-lg">
                  Choose a confirmed case from the list to view, manage, and distribute the official confirmation letter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationSheet;