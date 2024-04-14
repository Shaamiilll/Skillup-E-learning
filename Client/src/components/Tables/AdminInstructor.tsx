import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { selectInstructors } from '../../Redux/slice/instructorSlice';
import { getInstructors } from '../../Redux/actions/instructorAction';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';
import api from '../../axios/api';

function AdminInstructor() {
  const token = localStorage.getItem('skillUpToken');
  const dispatch: AppDispatch = useDispatch();
  const allInstructors = useSelector(selectInstructors);
  const [filteredInstructors, setFilteredInstructors] = useState(allInstructors);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState('');
  const [userStatus, setUserStatus] = useState(Boolean);
  const [viewType, setViewType] = useState('approved'); 

  useEffect(() => {
    try {
      dispatch(getInstructors(''));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast('An unexpected error occurred');
      }
    }
  }, [dispatch, token]);

  // Filter instructors based on view type
  useEffect(() => {
    if (viewType === 'approved') {
      setFilteredInstructors(allInstructors.filter(user => user.verified));
    } else {
      setFilteredInstructors(allInstructors.filter(user => !user.verified));
    }
  }, [allInstructors, viewType]);

  const handleApprove = async (userId: string) => {
    try {
      // Perform the approve action
      await api.patch(
        `/user/approve?_id=${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Show success message
      toast.success('User has been approved');
      // Reload the data
      dispatch(getInstructors(''));
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing the request');
    }
  };

  const handleBlock = async (userId: string, isBlock: boolean) => {
    setUserIdToBlock(userId);
    setUserStatus(isBlock);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirm: boolean) => {
    if (confirm) {
      try {
        // Perform the block/unblock action
        await api.patch(
          `/user/status?_id=${userIdToBlock}&isBlock=${!userStatus}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // Show success message
        toast.success('Changed user status');
        // Reload the data
        dispatch(getInstructors(''));
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while processing the request');
      }
    }

    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className="input-type p-6">
        <input
          type="text"
          placeholder="Search"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="flex justify-center mt-4">
        {/* Toggle buttons */}
        <button className={`mr-4 ${viewType === 'approved' ? 'bg-blue-500' : 'bg-gray-300'} text-white px-4 py-2 rounded-md`} onClick={() => setViewType('approved')}>
          Approved
        </button>
        <button className={`bg-gray-300 ${viewType === 'pending' ? 'bg-blue-500' : 'bg-gray-300'} text-white px-4 py-2 rounded-md`} onClick={() => setViewType('pending')}>
          Pending
        </button>
      </div>
      <table className="min-w-full table-auto">
        {/* Table header */}
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Email</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Role</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Action</span>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-gray-50">
          {filteredInstructors.length > 0 ? (
            filteredInstructors.map(user => (
              <tr key={user._id} className="bg-grey-50 text-center">
                <td className="px-16 py-2 flex flex-row items-center">
                  <img className="h-8 w-8 rounded-full object-cover" src={user.avatar} alt="avatar" />
                  <span className="text-center ml-2 font-semibold">{user.name}</span>
                </td>
                <td className="px-16 py-2">
                  <span>{user.email}</span>
                </td>
                <td className="px-16 py-2">
                  <span>{user.role}</span>
                </td>
                <td className="px-16 py-2 flex justify-around gap-4">
                  {viewType === 'approved' ? (
                    user.isBlock ? (
                      <button onClick={() => handleBlock(user._id, true)}>Unblock</button>
                    ) : (
                      <button onClick={() => handleBlock(user._id, false)}>Block</button>
                    )
                  ) : (
                    <button onClick={() => handleApprove(user._id)}>Approve</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Confirmation modal */}
      <Modal
        isVisible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      >
        <h3>Confirmation</h3>
        <p>Are you sure you want to proceed?</p>
        <div className="flex justify-center mt-4">
          <button
            className="mr-4 bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleConfirmation(true)}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleConfirmation(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AdminInstructor;
