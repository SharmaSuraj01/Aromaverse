export const updateInventory = (items, type = 'subtract') => {
  try {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    const updatedProducts = products.map(product => {
      const orderItem = items.find(item => item.id === product.id);
      if (orderItem) {
        const currentQty = product.quantity || 0;
        const newQty = type === 'subtract' 
          ? Math.max(0, currentQty - orderItem.qty)
          : currentQty + orderItem.qty;
        
        return { ...product, quantity: newQty };
      }
      return product;
    });
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    console.log('✅ Inventory updated successfully');
  } catch (error) {
    console.error('❌ Error updating inventory:', error);
  }
};
