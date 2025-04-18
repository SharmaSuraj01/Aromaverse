import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const updateInventory = async (items, type = 'subtract') => {
  try {
    for (const item of items) {
      const productRef = doc(db, 'products', item.id); // assumes `item.id` matches Firestore doc ID
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        const currentQty = productData.quantity || 0;

        const newQty =
          type === 'subtract'
            ? Math.max(0, currentQty - item.qty)
            : currentQty + item.qty;

        await updateDoc(productRef, { quantity: newQty });
      } else {
        console.warn(`Product with ID ${item.id} not found in Firestore.`);
      }
    }
    console.log('✅ Inventory updated successfully');
  } catch (error) {
    console.error('❌ Error updating inventory:', error);
  }
};
