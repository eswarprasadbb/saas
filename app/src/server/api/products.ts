import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

// Delete a product
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Find and delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(productId) }
    });

    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
