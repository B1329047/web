import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Typography } from '@mui/material';

function App() {
  // 存放從 API 抓回來的原始資料
  const [allData, setAllData] = useState([]);
  // 存放搜尋過濾後要顯示在 DataGrid 的資料
  const [filteredData, setFilteredData] = useState([]);
  // 存放搜尋關鍵字
  const [keyword, setKeyword] = useState('');

  // 對應 HW#5 規格：使用 useEffect 呼叫 API
  useEffect(() => {
    // 這裡使用文化部展覽資訊 API 作為範例，請依你的實際作業 API 網址替換
    fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
      .then(res => res.json())
      .then(data => {
        // DataGrid 規定每一筆 row 資料都必須有一個唯一的 'id' 屬性
        // 所以我們用 map 幫原始資料加上 id，並整理需要的欄位
        const formattedData = data.map((item, index) => ({
          id: index,
          title: item.title,
          location: item.showInfo && item.showInfo.length > 0 ? item.showInfo[0].locationName : '線上活動',
          price: item.showInfo && item.showInfo.length > 0 && item.showInfo[0].price ? item.showInfo[0].price : '免費'
        }));
        
        setAllData(formattedData);
        setFilteredData(formattedData); // 初始畫面顯示全部資料
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // 傳入空陣列 []，代表只在元件初次渲染時執行一次 (類似 ComponentDidMount)

  // 處理搜尋輸入框的變化
  const handleSearch = (event) => {
    const val = event.target.value.toLowerCase();
    setKeyword(val);
    
    // 根據關鍵字過濾標題 (title)
    const filtered = allData.filter(row => row.title.toLowerCase().includes(val));
    setFilteredData(filtered);
  };

  // 定義 DataGrid 的欄位 (對應原本 HTML table 的 th)
  const columns = [
    { field: 'title', headerName: '名稱', width: 450 },
    { field: 'location', headerName: '地點', width: 250 },
    { field: 'price', headerName: '票價', width: 150 }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        景點觀光展覽資訊
      </Typography>

      {/* 名稱搜尋功能 (onChange) */}
      <TextField
        label="名稱搜尋"
        variant="outlined"
        value={keyword}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      {/* 使用 MUI DataGrid 取代原本的 HTML Table */}
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          // 內建分頁設定 (預設每頁 10 筆資料，滿足 HW#4 的要求)
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
}

export default App;