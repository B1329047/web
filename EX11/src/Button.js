import React from 'react';
import Button from '@material-ui/core/Button'; // 用於長方形按鈕
import IconButton from '@material-ui/core/IconButton'; // 用於圓形圖示按鈕
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const CguMultiButton = ({ num }) => {
  const changeText = (event) => {
    event.currentTarget.innerText = event.currentTarget.innerText + "被點了";
  };

  const output = [];
  // 產生 10 個文字按鈕
  for (let i = 1; i <= num; i++) {
    output.push(
      <Button 
        key={i} 
        variant="contained" 
        color="primary" 
        onClick={changeText}
        style={{ margin: '5px' }}
      >
        第{i}個按鍵
      </Button>
    );
  }

  return (
    <>
      {/* 顯示文字按鈕區塊[cite: 1] */}
      <div>{output}</div> 
      
      {/* 顯示圖示按鈕區塊（就是你 PPT 截圖中的那三個）[cite: 1] */}
      <div style={{ marginTop: '20px' }}>
        <IconButton color="primary"><AddShoppingCartIcon /></IconButton>
        <IconButton color="primary"><DeleteIcon /></IconButton>
        <IconButton color="primary"><AlarmIcon /></IconButton>
      </div>
    </>
  );
};

export default CguMultiButton;