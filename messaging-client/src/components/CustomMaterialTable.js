import React, { useEffect, useState } from "react";
import MaterialTable  from '@material-table/core';

export default function CustomeMaterialTable(props) {

  const {
  columnList,
  data,
  rowClickAction,
  } = props;


  return (
    <MaterialTable
      columns={columnList}
      data={data}
      title= {""}
      onRowClick={(event, rowData) => {
        rowClickAction(rowData);
      }}
      options={{
       
       actionsColumnIndex: -1,
        pageSize: 10,
        pageSizeOptions: [5, 10, 15, 20, 50],
        search: true,
        grouping: true,
        
      }}
    ></MaterialTable>
  );
}
