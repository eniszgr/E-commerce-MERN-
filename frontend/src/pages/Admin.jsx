import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../redux/productSlice'; // <-- Doğrudan import et

function Admin() {
  const dispatch = useDispatch();
  const { adminProducts, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* adminProducts ile admin panelini burada render edebilirsiniz */}
          Admin Panel İçeriği
        </div>
      )}
    </div>
  );
}

export default Admin