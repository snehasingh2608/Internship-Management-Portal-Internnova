import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';
import { feedbackAPI, handleAPIError, STUDENT_ID } from '../../api';
import { 
  ArrowLeftIcon,
  UserIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
// import Badge from '../components/ui/Badge';

const Feedback = () => {
  const navigate = useNavigate();
  
  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      facultyName: 'Dr. Sarah Johnson',
      facultyRole: 'Internship Coordinator',
      message: 'Excellent progress on the frontend development tasks. Your code quality has improved significantly over the past month. Keep up the good work on the React components.',
      rating: 4.5,
      date: '2024-03-15',
      type: 'Monthly Review',
      category: 'Performance'
    },
    {
      id: 2,
      facultyName: 'Prof. Michael Chen',
      facultyRole: 'Computer Science Department',
      message: 'Your weekly reports are detailed and well-structured. The documentation you provided for the API integration was particularly helpful. Consider adding more technical details about challenges faced.',
      rating: 4.0,
      date: '2024-03-10',
      type: 'Report Review',
      category: 'Documentation'
    },
    {
      id: 3,
      facultyName: 'Dr. Sarah Johnson',
      facultyRole: 'Internship Coordinator',
      message: 'Good attendance record and consistent performance. The team collaboration skills you\'ve demonstrated are valuable. Focus on improving time management for complex tasks.',
      rating: 4.2,
      date: '2024-03-01',
      type: 'Bi-weekly Check-in',
      category: 'Soft Skills'
    },
    {
      id: 4,
      facultyName: 'Prof. Emily Davis',
      facultyRole: 'Industry Mentor',
      message: 'Strong technical foundation shown in your work. The debugging approach you took for the recent issue was methodical. Continue exploring new technologies and frameworks.',
      rating: 4.7,
      date: '2024-02-20',
      type: 'Technical Review',
      category: 'Technical Skills'
    },
    {
      id: 5,
      facultyName: 'Dr. Sarah Johnson',
      facultyRole: 'Internship Coordinator',
      message: 'Initial assessment shows good understanding of requirements. Your onboarding at the company went smoothly. Maintain regular communication with your mentor.',
      rating: 4.0,
      date: '2024-02-01',
      type: 'Initial Assessment',
      category: 'Onboarding'
    }
  ]);

  // Fetch feedback data from backend
  const fetchFeedbackData = async () => {
    try {
      const response = await feedbackAPI.getStudentFeedback(STUDENT_ID);
      
      if (response.data) {
        setFeedbackData(response.data);
      }
      
      console.log('Feedback Data:', response.data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      // Keep using default data if API fails
    }
  };

  // Fetch feedback on component mount
  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Performance':
        return 'bg-blue-100 text-blue-800';
      case 'Documentation':
        return 'bg-green-100 text-green-800';
      case 'Soft Skills':
        return 'bg-purple-100 text-purple-800';
      case 'Technical Skills':
        return 'bg-orange-100 text-orange-800';
      case 'Onboarding':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : star === Math.ceil(rating) && rating % 1 !== 0
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <StudentLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Feedback</h1>
          <p className="text-lg text-gray-600">
            Review feedback and evaluations from your faculty mentors
          </p>
        </div>

        {/* Feedback Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">{feedbackData.length}</div>
            <p className="text-sm text-gray-600">Total Feedback</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {(feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {new Set(feedbackData.map(f => f.facultyName)).size}
            </div>
            <p className="text-sm text-gray-600">Faculty Members</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {feedbackData.filter(f => {
                const feedbackDate = new Date(f.date);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return feedbackDate >= thirtyDaysAgo;
              }).length}
            </div>
            <p className="text-sm text-gray-600">Last 30 Days</p>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-6">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feedback.facultyName}</h3>
                    <p className="text-sm text-gray-600">{feedback.facultyRole}</p>
                  </div>
                </div>
                <div className="text-right">
                  {/* <Badge variant="default" size="sm" className={getCategoryColor(feedback.category)}>
                    {feedback.category}
                  </Badge> */}
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded">
  Something
</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{new Date(feedback.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>

              {/* Feedback Content */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">{feedback.type}</span>
                  {renderStars(feedback.rating)}
                </div>
                <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  Reply to Feedback
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no feedback) */}
        {feedbackData.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Feedback Yet</h3>
            <p className="text-gray-600">
              Faculty feedback will appear here once your mentors provide evaluations.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Feedback;
