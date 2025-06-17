
import React from 'react';
import { MedicationItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import Button from './Button';

interface MedicationInputProps {
  item: MedicationItem;
  onChange: (id: string, field: keyof Omit<MedicationItem, 'id'>, value: string) => void;
  onRemove: (id: string) => void;
  index: number;
}

const MedicationInput: React.FC<MedicationInputProps> = ({ item, onChange, onRemove, index }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(item.id, name as keyof Omit<MedicationItem, 'id'>, value);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm space-y-3 bg-white relative mb-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-semibold text-neutral">Medicamento #{index + 1}</h4>
        <Button
          type="button"
          onClick={() => onRemove(item.id)}
          variant="danger"
          size="sm"
          className="p-1"
          aria-label="Eliminar medicamento"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
      
      <div>
        <label htmlFor={`medName-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Medicamento/Remedio
        </label>
        <input
          type="text"
          id={`medName-${item.id}`}
          name="name"
          value={item.name}
          onChange={handleInputChange}
          placeholder="Ej: Amoxicilina, Árnica Montana"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`dosage-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Dosis
          </label>
          <input
            type="text"
            id={`dosage-${item.id}`}
            name="dosage"
            value={item.dosage}
            onChange={handleInputChange}
            placeholder="Ej: 500mg, 30CH"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor={`duration-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Duración/Tiempo
          </label>
          <input
            type="text"
            id={`duration-${item.id}`}
            name="duration"
            value={item.duration}
            onChange={handleInputChange}
            placeholder="Ej: Dos veces al día por 7 días"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor={`instructions-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Instrucciones Específicas
        </label>
        <textarea
          id={`instructions-${item.id}`}
          name="instructions"
          value={item.instructions}
          onChange={handleInputChange}
          rows={2}
          placeholder="Ej: Tomar con alimentos, Evitar la luz solar"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
    </div>
  );
};

export default MedicationInput;