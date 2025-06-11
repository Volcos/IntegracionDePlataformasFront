// autoparts/client/src/pages/WarehouseInventory/WarehouseInventoryPage.jsx
import React, { useState } from 'react';
import styles from './WarehouseInventoryPage.module.css';

function WarehouseInventoryPage() {
  // Datos de stock de ejemplo por sede
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Faro Delantero LED',
      minStock: 10,
      imageUrl: 'https://via.placeholder.com/60x60?text=Faro',
      stockByBranch: {
        'Sede Central': 50,
        'Sede Norte': 12,
        'Sede Sur': 5, // Bajo stock aquí
      },
    },
    {
      id: 2,
      name: 'Kit de Frenos Cerámicos',
      minStock: 8,
      imageUrl: 'https://via.placeholder.com/60x60?text=Frenos',
      stockByBranch: {
        'Sede Central': 15,
        'Sede Norte': 3, // Bajo stock aquí
        'Sede Sur': 10,
      },
    },
    {
      id: 3,
      name: 'Filtro de Aire Deportivo',
      minStock: 15,
      imageUrl: 'https://via.placeholder.com/60x60?text=Filtro',
      stockByBranch: {
        'Sede Central': 25,
        'Sede Norte': 12, // Bajo stock aquí
        'Sede Sur': 20,
      },
    },
    {
      id: 4,
      name: 'Amortiguador Reforzado',
      minStock: 10,
      imageUrl: 'https://via.placeholder.com/60x60?text=Amort',
      stockByBranch: {
        'Sede Central': 8, // Bajo stock aquí
        'Sede Norte': 10,
        'Sede Sur': 12,
      },
    },
  ]);

  // Obtener los nombres de las sedes dinámicamente de los datos de ejemplo
  const branchNames = Object.keys(inventory[0]?.stockByBranch || {});

  // Función para manejar el cambio de stock
  const handleStockChange = (productId, branchName, changeType) => {
    setInventory(prevInventory =>
      prevInventory.map(product => {
        if (product.id === productId) {
          const currentStock = product.stockByBranch[branchName];
          let newStock = currentStock;

          if (changeType === 'add') {
            newStock = currentStock + 1;
          } else if (changeType === 'remove' && currentStock > 0) {
            newStock = currentStock - 1;
          }

          return {
            ...product,
            stockByBranch: {
              ...product.stockByBranch,
              [branchName]: newStock,
            },
          };
        }
        return product;
      })
    );
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