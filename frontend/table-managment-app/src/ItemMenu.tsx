import { useState } from "react";
import { useParams,BrowserRouter as Router, Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from './AuthContext';
import Paper from '@mui/material/Paper';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import './ItemMenu.css'; // 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

  } from "@mui/material";


/* category
name , price

*/


type Items = {

    category: string;
    name: string;
    price: number;
}

type TableItems = {

    name: string;
    price: number;
    quantity: number;
    category: string;
}

function fetchMenuItems() {

    const [menuItems, setMenuItems] = useState<Items[] >([]);

    useEffect(() => {
        axios.get('http://localhost:3000/items')
        .then(res => setMenuItems(res.data))
        .catch(err => console.error(err));
    }, []);

    return menuItems;
}

function fetchTableItems(tableNumber: string | undefined) {
    
    const [tableItems, setTableItems] = useState< TableItems[] >([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/table-items/${tableNumber}`)
        .then(res => setTableItems(res.data))
        .catch(err => console.error(err));
    }, []);



    return tableItems;
}


function ItemMenu(){

    const {userName } = useAuth();
    
    const menuItems = fetchMenuItems();
    const [categories, setCategories] = useState<string[]>([]);
    
    // const [tableItems, setTableItems] = useState<(Items & { quantity: number })[]>([]);
    const { tableNumber } = useParams<{ tableNumber: string }>(); //tableNumber is passed as a URL parameter
    const tableItemsData = fetchTableItems(tableNumber);
    console.log(tableItemsData);
    const [tableItems, setTableItems] = useState<TableItems []>([]);

    useEffect(() => {
        setTableItems(tableItemsData);
    }, [tableItemsData]);



    // for items in the Menu , get the categories
    useEffect(() => {
        const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
        setCategories(uniqueCategories);
    }, [menuItems]);
    

    const navigate = useNavigate();

    const processOrder = () => {
        //save the order to the server
        const orderData = 
            tableItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
        console.log(orderData);
        // axios.put(`http://localhost:3000/table-status/${tableNumber}`, orderData)
        console.log(JSON.stringify(orderData, null, 2));
        axios.put(`http://localhost:3000/table-items/${tableNumber}`, orderData)

        // checking the order list is empty or not
        // if empty , make the ordered status false
        // if not empty , make the ordered status true
        const orderedStatus = orderData.length > 0 ? true : false;
        console.log(orderedStatus);
        axios.put(`http://localhost:3000/table-status/table${tableNumber}`, { ordered: orderedStatus , orderedBy: userName })
        
        navigate("/home");
    
    
    }




    
return (
    
    <div>


    <div className="centered-container">
  <div>
    <Button color="secondary" variant="contained" onClick={() => navigate("/home")} sx={{ mb: 2 }}>
            Back to Home
        </Button>

    <h1 className="menu-title">Item Menu</h1>
    <p className="table-info">Selected Table: {tableNumber}</p>
</div>
    <div
  style={{
    display: "flex",
    flexWrap: "wrap", // Allow items to wrap to next row
    gap: "20px",
    justifyContent: "center", // Center items nicely
    padding: "20px",
    marginTop: "40px",

  }}
>
  {categories.map((category) => (
    <div
      key={category}
      style={{
        backgroundColor: "#e3f2fd",
        color: "black",
        padding: "16px",
        borderRadius: "8px",
        width: "350px", // Consistent width per card
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <h2>{category}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems
          .filter((item) => item.category === category)
          .map((item, index) => (
            <li
              key={index}
              style={{ marginBottom: "12px", textAlign: "left" }}
            >
              <strong>{item.name}</strong>
              <div>Rs. {item.price.toFixed(2)}</div>
              <Button
                variant="contained"
                onClick={() => {
                  const existingItem = tableItems.find(
                    (tableItem) => tableItem.name === item.name
                  );
                  if (existingItem) {
                    setTableItems(
                      tableItems.map((tableItem) =>
                        tableItem.name === item.name
                          ? {
                              ...tableItem,
                              quantity: tableItem.quantity + 1,
                            }
                          : tableItem
                      )
                    );
                  } else {
                    setTableItems([...tableItems, { ...item, quantity: 1 }]);
                  }
                }}
              >
                Add
              </Button>
            </li>
          ))}
      </ul>
    </div>
  ))}
</div>


<div>
<TableContainer
  component={Paper}
  sx={{
    backgroundColor: "#e3f2fd",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "60px",
    width: "90%",
    maxWidth: "800px",
    marginInline: "auto",
    color: "black",
  }}
>
  <Typography variant="h5" sx={{ mb: 2 }}>
    Selected Items
  </Typography>

  <Table>
    <TableHead>
      <TableRow>
        <TableCell><strong>Item</strong></TableCell>
        <TableCell align="right"><strong>Price (Rs.)</strong></TableCell>
        <TableCell align="right"><strong>Quantity</strong></TableCell>
        <TableCell align="right"><strong></strong></TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {tableItems.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.name}</TableCell>
          <TableCell align="right">{item.price.toFixed(2)}</TableCell>
          <TableCell align="right">{item.quantity}</TableCell>
          <TableCell align="right">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                const existingItem = tableItems.find(
                  (tableItem) => tableItem.name === item.name
                );
                if (existingItem && existingItem.quantity > 1) {
                  setTableItems(
                    tableItems.map((tableItem) =>
                      tableItem.name === item.name
                        ? {
                            ...tableItem,
                            quantity: tableItem.quantity - 1,
                          }
                        : tableItem
                    )
                  );
                } else {
                  setTableItems(
                    tableItems.filter(
                      (tableItem) => tableItem.name !== item.name
                    )
                  );
                }
              }}
            >
              Remove
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  <Button
    onClick={processOrder}
    variant="contained"
    color="success"
    sx={{
      display: "block",
      margin: "40px auto 50px",
      padding: "10px 20px",
      borderRadius: "4px",
    }}
  >
    Process Order
  </Button>
</TableContainer>

</div>



    </div>
    
    </div>
);


}


export default ItemMenu;