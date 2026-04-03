import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../layout/Navbar';
import CommonSidebar from '../../layout/CommonSidebar';
import { nocAPI } from '../../api/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import FilterDropdown from '../../components/ui/FilterDropdown';
import Modal from '../../components/ui/Modal';
import Table from '../../components/ui/Table';
import { EyeIcon, DownloadIcon, DocumentIcon } from '../../components/icons';

const NOCApprovals = () => {
  const [nocRequests, setNOCRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedNOC, setSelectedNOC] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const fetchNOCRequests = async () => {
    try {
      const res = await nocAPI.getMyRequests();
      setNOCRequests(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load NOC requests');
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = useCallback(() => {
    let filtered = nocRequests;

    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [nocRequests, searchTerm, statusFilter]);

  useEffect(() => {
    fetchNOCRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [filterRequests]);

  const handleNOCAction = async (nocId, action) => {
    try {
      if (action === 'approve') {
        await nocAPI.approve(nocId);
      } else {
        await nocAPI.reject(nocId, { remarks: 'Rejected by faculty' });
      }
      fetchNOCRequests();
    } catch (error) {
      console.error('Error handling NOC action:', error);
    }
  };

  const viewOfferLetter = (noc) => {
    setSelectedNOC(noc);
    setShowModal(true);
  };

  const getTableData = () => {
    return filteredRequests.map(req => [
      req.studentName || '-',
      req.company || '-',
      `$${req.stipend || 0}/month`,
      req.appliedDate ? new Date(req.appliedDate).toLocaleDateString() : '-',
      <Badge 
        key={req._id} 
        variant={
          req.status === 'approved' ? 'success' :
          req.status === 'rejected' ? 'danger' : 'warning'
        }
      >
        {req.status || 'Pending'}
      </Badge>,
      <div key={req._id} className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => viewOfferLetter(req)}
        >
          <EyeIcon className="mr-1" />
          View
        </Button>
        {req.status === 'pending' && (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => handleNOCAction(req._id, 'approve')}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleNOCAction(req._id, 'reject')}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <CommonSidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">NOC Approvals</h1>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search by student name or company..."
                    onSearch={setSearchTerm}
                  />
                </div>
                <FilterDropdown
                  options={statusOptions}
                  selectedValue={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Filter by status"
                  className="w-full sm:w-48"
                />
              </div>
            </Card>

            {/* Table */}
            <Table
              headers={['Student Name', 'Company', 'Stipend', 'Applied Date', 'Status', 'Actions']}
              data={getTableData()}
              loading={loading}
              error={error}
              emptyMessage="No NOC requests found"
              onRetry={fetchNOCRequests}
            />
          </div>
        </main>
      </div>

      {/* Offer Letter Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Offer Letter Details"
        size="md"
      >
        {selectedNOC && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Student Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{selectedNOC.studentName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{selectedNOC.studentEmail}</p>
                </div>
                <div>
                  <span className="text-gray-600">Company:</span>
                  <p className="font-medium">{selectedNOC.company}</p>
                </div>
                <div>
                  <span className="text-gray-600">Position:</span>
                  <p className="font-medium">{selectedNOC.position}</p>
                </div>
                <div>
                  <span className="text-gray-600">Stipend:</span>
                  <p className="font-medium">${selectedNOC.stipend}/month</p>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <p className="font-medium">{selectedNOC.duration}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Offer Letter</h4>
              {selectedNOC.offerLetter ? (
                <div className="text-center">
                  <div className="bg-gray-200 rounded-lg p-8 mb-4">
                    <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-gray-600 mt-2">Offer Letter Available</p>
                  </div>
                  <Button variant="primary">
                    <DownloadIcon className="mr-2" />
                    Download Offer Letter
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">No offer letter uploaded</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NOCApprovals;
