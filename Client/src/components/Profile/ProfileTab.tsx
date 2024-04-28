import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/slice/authSlice";
import { AppDispatch } from "../../Redux/store";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/actions/authAction";
import api from "../../axios/api";

function ProfileTab() {
//   const dispatch: AppDispatch = useDispatch();
//   const user = useSelector(selectUser).user;
  const [user , setUser] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/find");
      
       setUser(response.data.user)
       console.log(user?.name);

       
        
        
      } catch (error) {
        // Handle error
      }
    };
  
    fetchData();
  
  }, []);
  
  const [name, setName] = useState(user?.name);
  const [imageView, setImageView] = useState('');

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: any) => {
    setImageView(e.target.files[0]);
  };

  return (
    <div className="bg-white w-full flex justify-center items-center flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>

            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src={imageView}
                  alt="Bordered avatar"
                />

                <div className="flex flex-col space-y-5 sm:ml-8">
                  <button
                    onClick={handleImageChange}
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  >
                    Change picture
                  </button>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <h1 className="items-start flex">Name</h1>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your first name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <h1 className="items-start flex">Email</h1>
                  <input
                    type="email"
                    id="email"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    value={user?.email}
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <h1 className="items-start flex">Role</h1>
                  <input
                    type="text"
                    id="profession"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your profession"
                    value={user?.role}
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                    placeholder="Write your bio here..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileTab;
