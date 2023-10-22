import React, { useEffect, useState } from 'react'
import './style.scss'
import { getAllTransaction } from '../../store/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminLoading from '../../components/shared/AdminLoading'

const AdminTransaction = () => {
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.transaction);

  const [dataTransaction, setDataTransaction] = useState('');

  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return 'N/A';
    }

    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return null;
    }

    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedAmount;
  }

  useEffect(() => {
    dispatch(getAllTransaction())
      .unwrap()
      .then((result) => {
        if (result.status === 200) {
          setDataTransaction(result.data)
        }
      });

  }, []);

  return (
    <div className='admin-transaction'>
      {loading
        ? <AdminLoading />
        :
        <div>
          <div className="search-container">
            <input placeholder="Search.." id="input" className="input" name="text" type="text" />

          </div>

          <div className='mt-3'>
            <div className='mt-3'>
              <table className="table border table-striped">
                <thead>
                  <tr className='table-primary'>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Level</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTransaction && dataTransaction?.map((transaction, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{transaction?.fullName}</td>
                      <td>{transaction?.email}</td>
                      <td>{transaction?.sđt}</td>
                      <td>{transaction?.level}</td>
                      <td>{formatCurrency(transaction?.amount)}</td>
                      <td>{formatDateTime(transaction?.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default AdminTransaction