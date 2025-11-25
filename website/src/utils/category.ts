import {
  Category,
  CategorySpecsFields,
  CategorySpecsType,
  CategoryType,
} from "@/types/category";
import { Car, PaintBucket, Settings, Wrench } from "lucide-react";

export const categories: Array<Category> = [
  {
    type: CategoryType.TOOL,
    name: "Herramientas",
    svg: Wrench,
    description:
      "Herramientas eléctricas y manuales diseñadas para ofrecer precisión, potencia y durabilidad en todo tipo de trabajos técnicos y de mantenimiento.",
    specsFields: [
      {
        field: CategorySpecsFields.brand,
        type: CategorySpecsType.string,
        label: "Marca",
      },
      {
        field: CategorySpecsFields.voltage,
        type: CategorySpecsType.string,
        label: "Voltaje",
      },
      {
        field: CategorySpecsFields.frequecy,
        type: CategorySpecsType.string,
        label: "Frecuencia",
      },
      {
        field: CategorySpecsFields.power,
        type: CategorySpecsType.string,
        label: "Potencia",
      },
      {
        field: CategorySpecsFields.speed,
        type: CategorySpecsType.string,
        label: "Velocidad",
      },
      {
        field: CategorySpecsFields.clampSize,
        type: CategorySpecsType.string,
        label: "Tamaño del sujetador",
      },
      {
        field: CategorySpecsFields.baseDiameter,
        type: CategorySpecsType.string,
        label: "Diámetro de la base",
      },
      {
        field: CategorySpecsFields.strokeLength,
        type: CategorySpecsType.string,
        label: "Longitud de carrera",
      },
      {
        field: CategorySpecsFields.accessories,
        type: CategorySpecsType.longString,
        label: "Accesorios incluidos",
      },
    ],
  },
  {
    type: CategoryType.PART,
    name: "Partes y piezas",
    svg: Settings,
    description:
      "Filtros y repuestos automotrices de alta calidad que garantizan un óptimo rendimiento del motor y una mayor vida útil del vehículo.",
    specsFields: [
      {
        field: CategorySpecsFields.brand,
        type: CategorySpecsType.string,
        label: "Marca",
      },
      {
        field: CategorySpecsFields.model,
        type: CategorySpecsType.string,
        label: "Modelo",
      },
      {
        field: CategorySpecsFields.features,
        type: CategorySpecsType.longString,
        label: "Características",
      },
      {
        field: CategorySpecsFields.compatibleWith,
        type: CategorySpecsType.longString,
        label: "Compatible con",
      },
    ],
  },
  {
    type: CategoryType.TIRE,
    name: "Neumáticos",
    svg: Car,
    description:
      "Neumáticos confiables, duraderos y seguros, fabricados con tecnología avanzada para ofrecer el mejor agarre y confort en cualquier terreno.",
    specsFields: [
      {
        field: CategorySpecsFields.brand,
        type: CategorySpecsType.string,
        label: "Marca",
      },
      {
        field: CategorySpecsFields.type,
        type: CategorySpecsType.string,
        label: "Tipo de neumático",
      },
      {
        field: CategorySpecsFields.model,
        type: CategorySpecsType.string,
        label: "Modelo",
      },
      {
        field: CategorySpecsFields.size,
        type: CategorySpecsType.string,
        label: "Tamaño",
      },
      {
        field: CategorySpecsFields.loadIndex,
        type: CategorySpecsType.string,
        label: "Índice de carga",
      },
      {
        field: CategorySpecsFields.speedIndex,
        type: CategorySpecsType.string,
        label: "Índice de velocidad",
      },
      {
        field: CategorySpecsFields.features,
        type: CategorySpecsType.longString,
        label: "Características",
      },
    ],
  },
  {
    type: CategoryType.OIL,
    name: "Lubricantes",
    svg: PaintBucket,
    description:
      "Lubricantes sintéticos y minerales de alto rendimiento, formulados para proteger el motor, reducir el desgaste y mejorar la eficiencia del vehículo.",
    specsFields: [
      {
        field: CategorySpecsFields.viscosity,
        type: CategorySpecsType.string,
        label: "Viscosidad",
      },
      {
        field: CategorySpecsFields.acea,
        type: CategorySpecsType.string,
        label: "Clasificación ACEA",
      },
      {
        field: CategorySpecsFields.api,
        type: CategorySpecsType.string,
        label: "Clasificación API",
      },
      {
        field: CategorySpecsFields.type,
        type: CategorySpecsType.string,
        label: "Tipo de lubricante",
      },
      {
        field: CategorySpecsFields.compatibleBrands,
        type: CategorySpecsType.longString,
        label: "Marcas compatibles",
      },
    ],
  },
];

export const getCurrentCategory = (categoryType: CategoryType | undefined) => {
  return categories.find(({ type }) => type === categoryType);
};
