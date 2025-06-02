import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Backdrop, Paper, Button } from '@mui/material';

type TableItems = {
  name: string;
  price: number;
  quantity: number;
};

type TablePopupModalProps = {
  isOpen: boolean;
  tableNum: string | undefined;
  onClose: () => void;
};

// 🔁 Custom hook to fetch data
function useTableItems(tableNumber: string | undefined) {
  const [tableItems, setTableItems] = useState<TableItems[]>([]);

  useEffect(() => {
    if (!tableNumber) return;
    axios
    .get(`http://localhost:3000/table-items/${tableNumber}`)
    .then((res) => setTableItems(res.data))
    .catch((err) => console.error(err));
  }, [tableNumber]);

  return tableItems;
}

const TablePopupModel: React.FC<TablePopupModalProps> = ({ tableNum, isOpen, onClose }) => {
  const tableItems = useTableItems(tableNum);

  if (!isOpen) return null;

  return (
    <Backdrop open={true} sx={{ zIndex: 2000 }}>
      <Paper
        elevation={4}
        sx={{
          backgroundColor: '#e8eaf6',
          padding: 4,
          borderRadius: 4,
          minWidth: 400,
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
        Close
        </Button>

        <h2>Table {tableNum}</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Item Name</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Price</th>
            <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tableItems.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '8px 0' }}>{item.name}</td>
                <td>Rs.{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Backdrop>
  );
};

export default TablePopupModel;
