import React, { useState, useMemo } from 'react';
import { WellkittProduct, wellkittCategories, getProductsByCategory, searchProducts } from '../constants/wellkittProducts';
import { WellkittSupplement } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface WellkittSupplementSelectorProps {
  supplements: WellkittSupplement[];
  onAddSupplement: (supplement: WellkittSupplement) => void;
  onUpdateSupplement: (id: string, updatedSupplement: WellkittSupplement) => void;
  onRemoveSupplement: (id: string) => void;
}

const WellkittSupplementSelector: React.FC<WellkittSupplementSelectorProps> = ({
  supplements,
  onAddSupplement,
  onUpdateSupplement,
  onRemoveSupplement,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSelector, setShowSelector] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<WellkittProduct | null>(null);
  const [dosage, setDosage] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');

  // Filtrar productos basado en categoría y búsqueda
  const filteredProducts = useMemo(() => {
    let products = getProductsByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery);
    }
    
    return products;
  }, [selectedCategory, searchQuery]);

  const handleProductSelect = (product: WellkittProduct) => {
    setSelectedProduct(product);
    setShowSelector(false);
    
    // Scroll to the form section after selection
    setTimeout(() => {
      const formElement = document.getElementById('supplement-form-section');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleAddSupplement = () => {
    if (selectedProduct && dosage.trim() && duration.trim()) {
      const newSupplement: WellkittSupplement = {
        id: uuidv4(),
        name: selectedProduct.name,
        brand: selectedProduct.brand,
        dosage: dosage.trim(),
        duration: duration.trim(),
        instructions: instructions.trim(),
        category: selectedProduct.category,
        presentation: selectedProduct.presentation,
      };

      onAddSupplement(newSupplement);
      
      // Reset form
      setSelectedProduct(null);
      setDosage('');
      setDuration('');
      setInstructions('');
    }
  };

  const handleUpdateSupplement = (id: string, field: keyof WellkittSupplement, value: string) => {
    const supplement = supplements.find(s => s.id === id);
    if (supplement) {
      onUpdateSupplement(id, { ...supplement, [field]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary mb-3 border-b pb-2">
          Suplementos Naturales Wellkitt
        </h3>
        <button
          type="button"
          onClick={() => {
            setShowSelector(true);
            setSearchQuery('');
            setSelectedCategory('Todas');
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-medium"
        >
          {selectedProduct ? '🔄 Cambiar Producto' : '+ Agregar Suplemento'}
        </button>
      </div>

      {/* Lista de suplementos agregados */}
      {supplements.length === 0 && !selectedProduct && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-700 text-sm">
            No hay suplementos agregados. Haz clic en <strong>"+ Agregar Suplemento"</strong> para comenzar.
          </p>
        </div>
      )}
      
      {supplements.length > 0 && (
        <div className="space-y-3">
          {supplements.map((supplement, index) => (
            <div key={supplement.id} className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">
                    {index + 1}. {supplement.name}
                  </h4>
                  <p className="text-sm text-green-600">
                    {supplement.brand} • {supplement.category}
                  </p>
                  {supplement.presentation && (
                    <p className="text-xs text-green-500 italic">
                      {supplement.presentation}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveSupplement(supplement.id)}
                  className="ml-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Dosis</label>
                  <input
                    type="text"
                    value={supplement.dosage}
                    onChange={(e) => handleUpdateSupplement(supplement.id, 'dosage', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-green-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: 1 cápsula"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Duración</label>
                  <input
                    type="text"
                    value={supplement.duration}
                    onChange={(e) => handleUpdateSupplement(supplement.id, 'duration', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-green-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: 30 días"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-green-700 mb-1">Instrucciones</label>
                  <input
                    type="text"
                    value={supplement.instructions}
                    onChange={(e) => handleUpdateSupplement(supplement.id, 'instructions', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-green-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Ej: Con el desayuno"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de selección de productos */}
      {showSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Seleccionar Suplemento Wellkitt
                </h3>
                <button
                  type="button"
                  onClick={() => setShowSelector(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Buscar por nombre, ingrediente o beneficio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Todas">Todas las categorías</option>
                    {wellkittCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {(searchQuery || selectedCategory !== 'Todas') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('Todas');
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de productos */}
            <div className="p-6 overflow-y-auto max-h-96">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-2">No se encontraron productos</p>
                  <p className="text-gray-400 text-sm">
                    Intenta con otros términos de búsqueda o selecciona una categoría diferente
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map(product => (
                      <div
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-colors"
                      >
                        <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
                        <p className="text-sm text-green-600 mb-2">{product.category}</p>
                        {product.presentation && (
                          <p className="text-xs text-gray-500 mb-2">{product.presentation}</p>
                        )}
                        <div className="text-xs text-gray-600">
                          <p className="font-medium mb-1">Ingredientes:</p>
                          <p className="mb-2">{product.ingredients.slice(0, 3).join(', ')}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Formulario para agregar suplemento */}
      {selectedProduct && (
        <div id="supplement-form-section" className="p-4 border-2 border-green-400 rounded-lg bg-green-50 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-green-800 text-lg">
                Agregar: {selectedProduct.name}
              </h4>
              <p className="text-sm text-green-600">
                {selectedProduct.brand} • {selectedProduct.category}
              </p>
            </div>
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">
              Producto seleccionado
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Dosis *</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ej: 1 cápsula"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Duración *</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ej: 30 días"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Instrucciones</label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ej: Con el desayuno"
              />
            </div>
          </div>

          <div className="space-y-2">
            {(!dosage.trim() || !duration.trim()) && (
              <p className="text-xs text-red-600 font-medium">
                * Por favor completa la dosis y duración para agregar el suplemento
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddSupplement}
                disabled={!dosage.trim() || !duration.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                ✓ Agregar Suplemento a la Receta
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setDosage('');
                  setDuration('');
                  setInstructions('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellkittSupplementSelector;
