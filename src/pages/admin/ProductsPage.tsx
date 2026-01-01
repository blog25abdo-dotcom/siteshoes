import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

const ProductsPage: React.FC = () => {
  const { state, dispatch, addProduct, updateProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    weight: '',
    type: '',
    packaging: '',
    features: '',
    images: [''],
    descriptionImage: '',
    useImageDescription: false,
    inStock: true,
    sizes: [] as { size: string; available: boolean; stock?: number }[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des données
    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (parseFloat(formData.price) <= 0) {
      alert('Le prix doit être supérieur à 0');
      return;
    }
    
    const validImages = formData.images.filter(img => img.trim());
    if (validImages.length === 0) {
      alert('Veuillez ajouter au moins une image');
      return;
    }
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      discount: formData.discount ? parseFloat(formData.discount) : null,
      category: formData.category,
      weight: formData.weight,
      type: formData.type,
      packaging: formData.packaging,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      images: validImages,
      inStock: formData.inStock,
      createdAt: editingProduct?.createdAt || new Date(),
      sizes: formData.sizes.filter(s => s.available),
    };

    // Ajouter descriptionImage seulement si nécessaire
    if (formData.useImageDescription && formData.descriptionImage) {
      productData.descriptionImage = formData.descriptionImage;
    } else if (editingProduct && editingProduct.descriptionImage) {
      // Si on modifie un produit qui avait une image de description, on la supprime explicitement
      productData.descriptionImage = null;
    }
    const saveProduct = async () => {
      try {
        console.log('Tentative de sauvegarde du produit:', productData);
        if (editingProduct) {
          await updateProduct(editingProduct.id, productData);
          console.log('Produit mis à jour avec succès');
        } else {
          await addProduct(productData);
          console.log('Produit ajouté avec succès');
        }
        resetForm();
        alert('Produit sauvegardé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        alert('Erreur lors de la sauvegarde du produit: ' + (error as Error).message);
      }
    };

    saveProduct();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      discount: '',
      category: '',
      weight: '',
      type: '',
      packaging: '',
      features: '',
      images: [''],
      descriptionImage: '',
      useImageDescription: false,
      inStock: true,
      sizes: [],
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      discount: product.discount?.toString() || '',
      category: product.category,
      weight: product.weight || '',
      type: product.type || '',
      packaging: product.packaging || '',
      features: product.features.join(', '),
      images: product.images,
      descriptionImage: product.descriptionImage || '',
      useImageDescription: !!product.descriptionImage,
      inStock: product.inStock,
      sizes: product.sizes || [],
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const performDelete = async () => {
        try {
          console.log('Tentative de suppression du produit:', id);
          await deleteProduct(id);
          console.log('Produit supprimé avec succès depuis l\'interface');
          alert('Produit supprimé avec succès !');
        } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du produit: ' + (error as Error).message);
        }
      };
      
      performDelete();
    }
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ''],
    });
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const getCategoryName = (categoryId: string) => {
    const category = state.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800">Gestion des Chaussures</h1>
          <p className="text-slate-600 mt-2 md:mt-3 text-sm md:text-lg">
            {state.products.length} modèle{state.products.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 md:space-x-3 transform hover:scale-105 shadow-lg text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-6 md:h-6" />
          <span className="font-semibold hidden sm:inline">Ajouter des Chaussures</span>
          <span className="font-semibold sm:hidden">Ajouter</span>
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-8">
                {editingProduct ? 'Modifier les Chaussures' : 'Ajouter des Chaussures'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Nom du modèle *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Prix (DH) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Réduction (%)
                  </label>
                  <select
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                  >
                    <option value="">Aucune réduction</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                  </select>
                  {formData.discount && (
                    <p className="text-sm text-green-600 mt-2 font-semibold">
                      Prix après réduction: {(parseFloat(formData.price) * (1 - parseFloat(formData.discount) / 100)).toFixed(2)} DH
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                    required
                  />
                </div>

                {/* Description Image Option */}
                <div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="useImageDescription"
                      checked={formData.useImageDescription}
                      onChange={(e) => setFormData({ ...formData, useImageDescription: e.target.checked })}
                      className="w-5 h-5 text-orange-600 border-2 border-slate-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="useImageDescription" className="ml-3 text-sm font-bold text-slate-700">
                      Ajouter une image de description
                    </label>
                  </div>
                  
                  {formData.useImageDescription && (
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        URL de l'image de description
                      </label>
                      <input
                        type="url"
                        value={formData.descriptionImage}
                        onChange={(e) => setFormData({ ...formData, descriptionImage: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                        placeholder="https://example.com/description-image.jpg"
                      />
                      {formData.descriptionImage && (
                        <div className="mt-4">
                          <img
                            src={formData.descriptionImage}
                            alt="Aperçu description"
                            className="w-full max-w-xs h-40 object-cover rounded-xl border-2 border-slate-200"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Catégorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {state.categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Matériau
                    </label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="ex: Cuir, Synthétique, Toile"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Style
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="ex: Casual, Élégant, Sport"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Accessoires Inclus
                    </label>
                    <input
                      type="text"
                      value={formData.packaging}
                      onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                      placeholder="ex: Boîte, lacets supplémentaires, chaussoir"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Caractéristiques (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                    placeholder="ex: Respirant, Antidérapant, Imperméable, Confortable"
                  />
                </div>

                {/* Sizes Management */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Gestion des Tailles (35-50)
                  </label>
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">
                      Cochez les tailles disponibles et indiquez le stock pour chaque taille
                    </p>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {Array.from({ length: 16 }, (_, i) => {
                      const size = (35 + i).toString();
                      const currentSizes = formData.sizes || [];
                      const sizeData = currentSizes.find(s => s.size === size);
                      return (
                        <div key={size} className="text-center">
                          <div className="text-sm font-medium text-slate-700 mb-2">{size}</div>
                          <div className="space-y-2">
                            <label className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={sizeData?.available || false}
                                onChange={(e) => {
                                  const newSizes = [...currentSizes];
                                  const existingIndex = newSizes.findIndex(s => s.size === size);
                                  
                                  if (e.target.checked) {
                                    if (existingIndex >= 0) {
                                      newSizes[existingIndex] = {
                                        ...newSizes[existingIndex],
                                        available: true
                                      };
                                    } else {
                                      newSizes.push({
                                        size,
                                        available: true,
                                        stock: 10
                                      });
                                    }
                                  } else {
                                    if (existingIndex >= 0) {
                                      newSizes.splice(existingIndex, 1);
                                    }
                                  }
                                  
                                  setFormData({ ...formData, sizes: newSizes });
                                }}
                                className="w-4 h-4 text-orange-600 border-2 border-slate-300 rounded focus:ring-orange-500"
                              />
                            </label>
                            {sizeData?.available && (
                              <input
                                type="number"
                                min="0"
                                max="999"
                                value={sizeData.stock || 0}
                                onChange={(e) => {
                                  const newSizes = [...currentSizes];
                                  const existingIndex = newSizes.findIndex(s => s.size === size);
                                  
                                  if (existingIndex >= 0) {
                                    newSizes[existingIndex] = {
                                      ...newSizes[existingIndex],
                                      stock: parseInt(e.target.value) || 0
                                    };
                                    setFormData({ ...formData, sizes: newSizes });
                                  }
                                }}
                                className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
                                placeholder="Stock"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {formData.sizes && formData.sizes.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium mb-2">
                        Tailles sélectionnées: {formData.sizes.filter(s => s.available).length}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.sizes.filter(s => s.available).map((size, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            {size.size} (Stock: {size.stock})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Images (URLs)
                  </label>
                  <div className="space-y-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex space-x-3">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => updateImage(index, e.target.value)}
                          className="flex-1 px-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300"
                          placeholder="https://example.com/image.jpg"
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="px-4 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImageField}
                      className="text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      + Ajouter une image
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-5 h-5 text-orange-600 border-2 border-slate-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="inStock" className="ml-3 text-sm font-bold text-slate-700">
                    Chaussures en stock
                  </label>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-semibold"
                  >
                    {editingProduct ? 'Mettre à jour' : 'Ajouter les chaussures'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-xl hover:bg-slate-50 transition-all duration-300 font-semibold"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      {state.products.length > 0 ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-orange-50">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">Chaussures</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">Catégorie</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">Prix</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">Tailles</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">Stock</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {state.products.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-2xl shadow-md"
                        />
                        <div>
                          <p className="font-bold text-slate-800 text-lg">{product.name}</p>
                          <p className="text-sm text-slate-600 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-600 font-medium">
                      {getCategoryName(product.category)}
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-800">
                      <div>
                        {product.discount ? (
                          <div>
                            <span className="line-through text-slate-400 text-sm">{product.originalPrice} DH</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-orange-600 font-bold text-lg">{product.price} DH</span>
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                                -{product.discount}%
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-lg">{product.price} DH</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1">
                        {product.sizes && product.sizes.filter(s => s.available).length > 0 ? (
                          <>
                            {product.sizes.filter(s => s.available).slice(0, 3).map((size, index) => (
                              <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                {size.size}
                              </span>
                            ))}
                            {product.sizes.filter(s => s.available).length > 3 && (
                              <span className="text-slate-400 text-xs">
                                +{product.sizes.filter(s => s.available).length - 3}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-slate-400 text-sm">Aucune taille</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-2 text-sm font-bold rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`/product/${product.id}`, '_blank')}
                          className="p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300"
                          title="Voir"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300"
                          title="Modifier"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
          <Package className="w-20 h-20 text-slate-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Aucune chaussure
          </h3>
          <p className="text-slate-600 mb-8 text-lg">
            Commencez par ajouter votre premier modèle de chaussures
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-semibold"
          >
            Ajouter des Chaussures
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;