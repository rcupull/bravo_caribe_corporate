import { Category, CategorySpecsFields, CategoryType } from "@/types/category";
import { Car, PaintBucket, Wrench } from "lucide-react";

export const categories: Array<Category> = [
  {
    type: CategoryType.TOOL,
    name: "Herramientas",
    svg: Wrench,
    description:
      "Herramientas eléctricas y manuales diseñadas para ofrecer precisión, potencia y durabilidad en todo tipo de trabajos técnicos y de mantenimiento.",
    specsFields: [
      { field: CategorySpecsFields.voltage, label: "Voltaje" },
      { field: CategorySpecsFields.power, label: "Potencia" },
      { field: CategorySpecsFields.speed, label: "Velocidad" },
      { field: CategorySpecsFields.clampSize, label: "Tamaño del sujetador" },
      { field: CategorySpecsFields.baseDiameter, label: "Diámetro de la base" },
      { field: CategorySpecsFields.strokeLength, label: "Longitud de carrera" },
      { field: CategorySpecsFields.accessories, label: "Accesorios incluidos" },
    ],
  },
  {
    type: CategoryType.PART,
    name: "Partes y piezas",
    svg: Wrench,
    description:
      "Filtros y repuestos automotrices de alta calidad que garantizan un óptimo rendimiento del motor y una mayor vida útil del vehículo.",
    specsFields: [
      { field: CategorySpecsFields.material, label: "Material" },
      { field: CategorySpecsFields.guarantee, label: "Garantía" },
      {
        field: CategorySpecsFields.filtrationEfficiency,
        label: "Eficiencia de filtración",
      },
      { field: CategorySpecsFields.features, label: "Características" },
      { field: CategorySpecsFields.compatibleWith, label: "Compatible con" },
    ],
  },
  {
    type: CategoryType.TIRE,
    name: "Neumáticos",
    svg: Car,
    description:
      "Neumáticos confiables, duraderos y seguros, fabricados con tecnología avanzada para ofrecer el mejor agarre y confort en cualquier terreno.",
    specsFields: [
      { field: CategorySpecsFields.type, label: "Tipo de neumático" },
      { field: CategorySpecsFields.size, label: "Tamaño" },
      { field: CategorySpecsFields.loadIndex, label: "Índice de carga" },
      { field: CategorySpecsFields.speedIndex, label: "Índice de velocidad" },
      { field: CategorySpecsFields.features, label: "Características" },
    ],
  },
  {
    type: CategoryType.OIL,
    name: "Lubricantes",
    svg: PaintBucket,
    description:
      "Lubricantes sintéticos y minerales de alto rendimiento, formulados para proteger el motor, reducir el desgaste y mejorar la eficiencia del vehículo.",
    specsFields: [
      { field: CategorySpecsFields.viscosity, label: "Viscosidad" },
      { field: CategorySpecsFields.acea, label: "Clasificación ACEA" },
      { field: CategorySpecsFields.api, label: "Clasificación API" },
      { field: CategorySpecsFields.type, label: "Tipo de lubricante" },
      {
        field: CategorySpecsFields.compatibleBrands,
        label: "Marcas compatibles",
      },
    ],
  },
];

export const getCurrentCategory = (categoryType: CategoryType | undefined) => {
  return categories.find(({ type }) => type === categoryType);
};
