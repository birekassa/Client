// src/components/recordOfficer/DataManagement.jsx
import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import {
  FaSearch, FaEdit, FaTrash, FaDownload, FaUpload, FaDatabase,
  FaFileExcel, FaPrint, FaFilter, FaPlus, FaCheck, FaTimes,
  FaUsers, FaBuilding
} from 'react-icons/fa';

const DataManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('residents');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const fileInputRef = useRef(null);

  // Sample Data
  const [residents, setResidents] = useState([
    { id: 1, name: 'አበበ ከበደ', house: 'KB03-H001', phone: '0912345678', status: 'Active', zone: 'ዞን 01' },
    { id: 2, name: 'ሙሉ አሰፋ', house: 'KB03-H045', phone: '0923456789', status: 'Active', zone: 'ዞን 02' },
    { id: 3, name: 'ትሩ ወርቁ', house: 'KB03-H089', phone: '0934567890', status: 'Inactive', zone: 'ዞን 03' },
    { id: 4, name: 'ደስታ ታደሰ', house: 'KB03-H112', phone: '0945678901', status: 'Active', zone: 'ዞን 01' }
  ]);

  const [houses, setHouses] = useState([
    { id: 1, number: 'KB03-H001', type: 'የኬበሌ', owner: 'አበበ ከበደ', status: 'Occupied', area: 120, rooms: 4 },
    { id: 2, number: 'KB03-H045', type: 'የግል', owner: 'ሙሉ አሰፋ', status: 'Occupied', area: 150, rooms: 5 },
    { id: 3, number: 'KB03-H089', type: 'የኪራይ', owner: 'ኬበሌ አስተዳደር', status: 'Vacant', area: 90, rooms: 3 },
    { id: 4, number: 'KB03-H112', type: 'የኬበሌ', owner: 'ደስታ ታደሰ', status: 'Occupied', area: 110, rooms: 4 }
  ]);

  const [formData, setFormData] = useState({
    name: '', house: '', phone: '', status: 'Active', zone: '',
    number: '', type: 'የኬበሌ', owner: '', area: '', rooms: ''
  });

  // Filter data
  const filteredResidents = residents.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.house.includes(searchTerm) ||
     item.phone.includes(searchTerm)) &&
    (filterStatus === 'all' || item.status === filterStatus)
  );

  const filteredHouses = houses.filter(item =>
    (item.number.includes(searchTerm) ||
     item.owner.toLowerCase().includes(searchTerm)) &&
    (filterStatus === 'all' || item.status === filterStatus)
  );

  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'residents') {
      setFormData({
        name: item.name, house: item.house, phone: item.phone,
        status: item.status, zone: item.zone
      });
    } else {
      setFormData({
        number: item.number, type: item.type, owner: item.owner,
        status: item.status, area: item.area, rooms: item.rooms
      });
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('እርግጠኛ ነዎት ይህን መረጃ መሰረዝ ይፈልጋሉ?')) {
      if (activeTab === 'residents') {
        setResidents(residents.filter(r => r.id !== id));
      } else {
        setHouses(houses.filter(h => h.id !== id));
      }
    }
  };

  const handleSave = () => {
    if (activeTab === 'residents') {
      const updated = { ...editingItem, ...formData };
      setResidents(residents.map(r => r.id === editingItem.id ? updated : r));
    } else {
      const updated = { ...editingItem, ...formData };
      setHouses(houses.map(h => h.id === editingItem.id ? updated : h));
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const handleExport = (format) => {
    alert(`${format.toUpperCase()} ፋይል ተዘጋጅቷል!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`${file.name} ተመርጧል! ማስገባት ተጀምሯል...`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 p-4 sm:p-6 print:bg-white print:p-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-indigo-100 print:border-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-purple-600 rounded-xl print:hidden">
                  <FaDatabase className="text-white text-xl sm:text-2xl" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">የዳታ አስተዳደር</h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Data Management - Woldia Kebele Administration</p>
                </div>
              </div>
              <div className="text-right print:hidden text-xs sm:text-sm">
                <p className="text-gray-500">ቀን: {format(new Date(), 'dd MMMM yyyy')}</p>
                <p className="text-gray-500">ጊዜ: {format(new Date(), 'hh:mm a')} EAT</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mb-6 border border-gray-200 print:hidden">
            <div className="flex flex-col sm:flex-row gap-3 border-b pb-4">
              <button
                onClick={() => setActiveTab('residents')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                  activeTab === 'residents'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaUsers className="text-lg" /> <span className="hidden sm:inline">ነዋሪዎች</span><span className="sm:hidden">ነዋሪ</span>
              </button>
              <button
                onClick={() => setActiveTab('houses')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                  activeTab === 'houses'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaBuilding className="text-lg" /> <span className="hidden sm:inline">ቤቶች</span><span className="sm:hidden">ቤቶች</span>
              </button>
            </div>

            {/* Search & Actions */}
            <div className="flex flex-col lg:flex-row gap-3 mt-4 sm:mt-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-3 sm:top-4 text-gray-400 text-sm sm:text-base" />
                <input
                  type="text"
                  placeholder="ፈልግ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-xl"
                >
                  <option value="all">ሁሉም</option>
                  <option value="Active">ንቁ</option>
                  <option value="Inactive">የተቋረጠ</option>
                  <option value="Occupied">ተይዟል</option>
                  <option value="Vacant">ባዶ</option>
                </select>
                <button
                  onClick={handleImport}
                  className="flex items-center gap-1 sm:gap-2 bg-orange-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-orange-700 text-xs sm:text-sm"
                >
                  <FaUpload /> <span className="hidden sm:inline">ማስገባት</span><span className="sm:hidden">አስገባ</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".csv,.xlsx"
                  className="hidden"
                />
                <button
                  onClick={() => handleExport('excel')}
                  className="flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-green-700 text-xs sm:text-sm"
                >
                  <FaFileExcel /> <span className="hidden sm:inline">Excel</span><span className="sm:hidden">XLS</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-blue-700 print:hidden text-xs sm:text-sm"
                >
                  <FaPrint /> <span className="hidden sm:inline">አትም</span><span className="sm:hidden">አትም</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm md:text-base">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700">ID</th>
                    {activeTab === 'residents' ? (
                      <>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700">ስም</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 hidden sm:table-cell">ቤት</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 hidden md:table-cell">ስልክ</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 hidden lg:table-cell">ዞን</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700">ቤት ቁጥር</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 hidden sm:table-cell">አይነት</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700">ባለቤት</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 hidden md:table-cell">ቦታ</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 hidden lg:table-cell">ክፍሎች</th>
                      </>
                    )}
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700">ሁኔታ</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-700 print:hidden">እርምጃ</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'residents' ? filteredResidents : filteredHouses).map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{item.id}</td>
                      {activeTab === 'residents' ? (
                        <>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{item.name}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{item.house}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{item.phone}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{item.zone}</td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{item.number}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{item.type}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4">{item.owner}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{item.area}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{item.rooms}</td>
                        </>
                      )}
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Active' || item.status === 'Occupied'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Inactive'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status === 'Active' ? 'ንቁ' :
                           item.status === 'Inactive' ? 'የተቋረጠ' :
                           item.status === 'Occupied' ? 'ተይዟል' : 'ባዶ'}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 print:hidden">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 sm:p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all"
                            title="አርም"
                          >
                            <FaEdit className="text-sm sm:text-base" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 sm:p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                            title="ሰርዝ"
                          >
                            <FaTrash className="text-sm sm:text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">መረጃ አርም</h3>
            <div className="space-y-3 sm:space-y-4">
              {activeTab === 'residents' ? (
                <>
                  <input type="text" placeholder="ስም" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                  <input type="text" placeholder="ቤት" value={formData.house} onChange={(e) => setFormData({...formData, house: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                  <input type="tel" placeholder="ስልክ" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl">
                    <option value="Active">ንቁ</option>
                    <option value="Inactive">የተቋረጠ</option>
                  </select>
                </>
              ) : (
                <>
                  <input type="text" placeholder="ቤት ቁጥር" value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl">
                    <option>የኬበሌ</option>
                    <option>የግል</option>
                    <option>የኪራይ</option>
                  </select>
                  <input type="text" placeholder="ባለቤት" value={formData.owner} onChange={(e) => setFormData({...formData, owner: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                  <input type="number" placeholder="ቦታ (m²)" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                  <input type="number" placeholder="ክፍሎች" value={formData.rooms} onChange={(e) => setFormData({...formData, rooms: e.target.value})} className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl" />
                </>
              )}
            </div>
            <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 sm:px-6 py-2 text-xs sm:text-sm border rounded-xl hover:bg-gray-50 flex items-center gap-1">
                <FaTimes /> <span className="hidden sm:inline">ሰርዝ</span><span className="sm:hidden">X</span>
              </button>
              <button onClick={handleSave} className="px-4 sm:px-6 py-2 text-xs sm:text-sm bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-1">
                <FaCheck /> <span className="hidden sm:inline">አስቀምጥ</span><span className="sm:hidden">✓</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          @page { margin: 1cm; size: A4; }
          body { -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .bg-gradient-to-br { background: white !important; }
          table { font-size: 10pt; }
          th, td { padding: 4px 6px; }
        }
        @media (max-width: 640px) {
          .hidden-sm { display: none; }
        }
      `}</style>
    </>
  );
};

export default DataManagement;