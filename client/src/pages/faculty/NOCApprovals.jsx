import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
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

  const fetchNOCRequests = async () => {
