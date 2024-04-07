import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../../Redux/actions/studentsAction';
import toast from 'react-hot-toast';
import { selectStudents } from '../../Redux/slice/studentsSlice';
import api from '../../axios/api';
import { AppDispatch } from '../../Redux/store';
import Modal from "../common/Modal";

interface ILearning {
  course: string;
  progress: string[];
  certificate: boolean;
}
interface IWallet {
  balance: string | number;
  transactions: {
    date: Date;
    amount: string | number;
    type: string;
    remark: string;
  }[];
}
interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  isBlock: boolean;
  verified: boolean;
  verification: {
    "0": string;
    "1": string;
    "2": string;
  };
  learnings: ILearning[];
  teachings: string[];
  wallet: IWallet;
}

export default function AdminUser() {
  const token = localStorage.getItem("skillUpToken");
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector(selectStudents);
  const [search, setSearch] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState("");

  useEffect(() => {
    try {
      dispatch(getStudents(""));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  }, [dispatch, token]);

  const handleBlock = async (userId: string, isBlock: boolean) => {
    setUserIdToBlock(userId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async (confirm: boolean) => {
    if (confirm) {
      await api.patch(`/user/status?_id=${id}&isBlock=${!isBlock}`,{},{
        headers: {
          Authorization: token,
        },
      })
      try {
        // Your logic for blocking or unblocking the user
      } catch (error: any) {
        console.error("Error:", error);
        toast.error("An error occurred while processing the request");
      }
    }
    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className='input-type p-6'>
        <input type="text" placeholder='Search' className='border px-5 py-3 focus:outline-none rounded-md' />
      </div>
      <table className='min-w-full table-auto'>
        <thead>
          <tr className='bg-gray-800'>
            <th className='px-16 py-2'>
              <span className='text-gray-200'>Name</span>
            </th>
            <th className='px-16 py-2'>
              <span className='text-gray-200'>Email</span>
            </th>
            <th className='px-16 py-2'>
              <span className='text-gray-200'>Role</span>
            </th>
            <th className='px-16 py-2'>
              <span className='text-gray-200'>Action</span>
            </th>
          </tr>
        </thead>
        <tbody className='bg-gray-50'>
          {data.map((user) => (
            <tr key={user._id} className='bg-grey-50 text-center'>
              <td className='px-16 py-2 flex flex-row items-center'>
                <img className='h-8 w-8 rounded-full object-cover' src={user.avatar} alt="avatar" />
                <span className='text-center ml-2 font-semibold'>{user.name}</span>
              </td>
              <td className='px-16 py-2'>
                <span>{user.email}</span>
              </td>
              <td className='px-16 py-2'>
                <span>{user.role}</span>
              </td>
              <td className='px-16 py-2 flex justify-around gap-4'>
                {user.isBlock ? (
                  <button onClick={() => handleBlock(user._id, false)}>Unblock</button>
                ) : (
                  <button onClick={() => handleBlock(user._id, true)}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isVisible={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
        <h3>Confirmation</h3>
        <p>Are you sure you want to proceed?</p>
        <div className="flex justify-center mt-4">
          <button className="mr-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleConfirmation(true)}>Yes</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleConfirmation(false)}>No</button>
        </div>
      </Modal>
    </>
  );
}
