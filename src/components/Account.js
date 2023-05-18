import React, { useState, useEffect } from "react";
import { auth, db } from './../firebase.js';
import { collection, query, where, getDocs } from "firebase/firestore";

function Account() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, "trades"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userData = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            userData.push(doc.data());
          }
        });
        setUserInfo(userData);
      }
    };

    fetchData();
  }, []);

  if (!auth.currentUser) {
    return <h1>Please log in to see your account data!</h1>;
  } else {
    return (
        <React.Fragment>

<div className='mt-20 bg-slate-800 text-slate-200 overflow-hidden'>
                <div className='mt-5 mb-5'>
                    <h1 className='pt-5 pb-10 inline mr-5 '>Saved Trades</h1>

                </div>

                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs uppercase bg-slate-700 text-slate-300'>
                        <tr>
                            <th className='px-6 py-3'>Representative</th>
                            <th className='px-6 py-3'>Date</th>
                            <th className='px-6 py-3'>Ticker</th>
                            <th className='px-6 py-3'>Transaction</th>
                            <th className='px-6 py-3'>Amount</th>
                            <th className='px-6 py-3'>Range</th>
                            <th className='px-6 py-3'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((data, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className='bg-slate-800 border-b dark:border-gray-700 text-slate-200'
                                >
                                    <td className='px-6 py-4 font-medium whitespace-nowrap text-slate-200'>
                                        {data.Representative}
                                    </td>
                                    <td className='px-6 py-4'>{data.Date}</td>
                                    <td className='px-6 py-4'>{data.Ticker}</td>
                                    <td className='px-6 py-4'>{data.Representative}</td>
                                    <td className='px-6 py-4'>{data.Transaction}</td>
                                    <td className='px-6 py-4'>{data.Amount}</td>
                                    <td className='px-6 py-4'>{data.Range}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
             
        </React.Fragment>
     
    );
  }
}

export default Account;