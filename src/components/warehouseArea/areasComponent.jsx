import React, { useState, useEffect } from 'react';
import { getAreasByWarehouseId } from '@/api/warehouse';
import {
  TableData,
  TableRows,
  TableHeadings,
} from '@/styled-components/TableComponent';
import Table from '@/styled-components/TableComponent';
import { PopupContent, PopupOverlay, CloseButton, FieldContainer } from '../styled-components/PopUp';
import { HeaderTitle } from '@/styled-components/ItemActionModal';

const AreasComponent = ({ warehouse_id, onClose,setShowAddArea }) => {
  const [warehouseArea, setWarehouseArea] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await getAreasByWarehouseId(warehouse_id);
        if (response && response.data && response.data.length > 0) {
          setWarehouseArea(response.data);
        } else {
          setWarehouseArea([]);  
        }
      } catch (error) {
        console.error('Error fetching areas:', error);  
      }
    };
  
    fetchAreas();
  }, [warehouse_id]);

  const handleClose = () => {
    setShowAddArea(false); // Close the modal using setShowAddArea
    onClose(); // Trigger the onClose function passed as a prop
  };


  return (
    <PopupOverlay>
      <PopupContent>        
        <HeaderTitle> warehouse Area </HeaderTitle>
        <FieldContainer>
         {warehouseArea && warehouseArea.length > 0 ? (
          <Table>
            <thead>
              <TableRows>
                <TableHeadings>Area Name</TableHeadings>
                <TableHeadings>Max Capacity</TableHeadings>
              </TableRows>
            </thead>
            <tbody>
              {warehouseArea.map((area) => (
                <TableRows key={area.area_id}>
                  <TableData>{area.area_name}</TableData>
                  <TableData>{area.max_capacity}</TableData>
                </TableRows>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No areas found for Warehouse ID: {warehouse_id}</p>
        )}
        <CloseButton onClick={handleClose}>Close</CloseButton>
        </FieldContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default AreasComponent;
