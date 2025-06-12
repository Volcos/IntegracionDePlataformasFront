// autoparts/client/src/pages/WarehouseInventory/WarehouseInventoryPage.jsx
import React, { useState,useEffect  } from 'react';
import styles from './WarehouseInventoryPage.module.css';
import defaultImage from '../../assets/images/default.png';
import axios from 'axios';


function WarehouseInventoryPage() {
  
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventario'); 
      setInventory(response.data);
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
    }
  };

  fetchInventory();
  }, []);

  const branchNames = Object.keys(inventory[0]?.stockByBranch || {});

  const handleStockChange = async (productId, branchName, changeType) => {
  const product = inventory.find(p => p.id === productId);
  if (!product) return;

  const cantidad = 1;
  const sucursal = branchName;
  const producto = productId;
  const url = changeType === 'add' ? 'agregarStock' : 'rebajarStock';

  try {
    await axios.put(`/api/${url}`, {
      sucursal,
      producto,
      cantidad
    });

    const response = await axios.get('/api/inventario');
    setInventory(response.data);
  } catch (error) {
    console.error(`Error al ${changeType === 'add' ? 'agregar' : 'rebajar'} stock:`, error);
  }
};


  return (
    <div className={styles.inventoryContainer}>
      <h1 className={styles.inventoryTitle}>Inventario de Bodega por Sede</h1>
      <p className={styles.inventorySubtitle}>Estado actual del stock de productos en cada sede.</p>

      <div className={styles.inventoryTableWrapper}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th rowSpan="2" className={styles.stickyColumn}>Producto</th>
              <th rowSpan="2">Stock Mínimo</th>
              <th colSpan={branchNames.length} className={styles.branchHeaderRow}>Stock por Sede</th>
            </tr>
            <tr>
              {branchNames.map(branch => (
                <th key={branch} className={styles.branchNameHeader}>{branch}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                <td className={`${styles.productCell} ${styles.stickyColumn}`}>
                  <img src={item.imageUrl} alt={item.name} className={styles.productThumbnail} />
                  {item.name}
                </td>
                <td>{item.minStock}</td>
                {branchNames.map(branch => {
                  const currentStock = item.stockByBranch[branch];
                  const isLowStock = currentStock < item.minStock;
                  return (
                    <td key={`${item.id}-${branch}`} className={isLowStock ? styles.lowStockCell : ''}>
                      <div className={styles.stockControl}>
                        <div className={styles.stockValue}>
                          {currentStock}
                          {isLowStock && (
                            <span className={styles.lowStockAlert}>¡Alerta!</span>
                          )}
                        </div>
                        <div className={styles.stockButtons}>
                          <button
                            onClick={() => handleStockChange(item.id, branch, 'remove')}
                            className={styles.stockButton}
                            title="Quitar Stock"
                            disabled={currentStock === 0}
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleStockChange(item.id, branch, 'add')}
                            className={styles.stockButton}
                            title="Agregar Stock"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendColorBoxLow}></span>
          Bajo Stock (por debajo del mínimo)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendColorBoxOk}></span>
          Stock OK (igual o por encima del mínimo)
        </span>
      </div>
    </div>
  );
}

export default WarehouseInventoryPage;