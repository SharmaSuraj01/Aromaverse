export const updateInventory = (items, type = 'subtract') => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    const updated = products.map((p) => {
      const matched = items.find((i) => i.name === p.name);
      if (matched) {
        const updatedQty =
          type === 'subtract'
            ? Math.max(0, p.quantity - matched.qty)
            : p.quantity + matched.qty;
  
        return { ...p, quantity: updatedQty };
      }
      return p;
    });
  
    localStorage.setItem('products', JSON.stringify(updated));
  };
  