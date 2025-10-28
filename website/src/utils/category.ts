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
      CategorySpecsFields.voltage,
      CategorySpecsFields.power,
      CategorySpecsFields.speed,
      CategorySpecsFields.clampSize,
      CategorySpecsFields.baseDiameter,
      CategorySpecsFields.strokeLength,
      CategorySpecsFields.accessories,
    ],
  },
  {
    type: CategoryType.PART,
    name: "Partes y piezas",
    svg: Wrench,
    description:
      "Filtros y repuestos automotrices de alta calidad que garantizan un óptimo rendimiento del motor y una mayor vida útil del vehículo.",
    specsFields: [
      CategorySpecsFields.material,
      CategorySpecsFields.guarantee,
      CategorySpecsFields.filtrationEfficiency,
      CategorySpecsFields.features,
      CategorySpecsFields.compatibleWith,
    ],
  },
  {
    type: CategoryType.TIRE,
    name: "Neumáticos",
    svg: Car,
    description:
      "Neumáticos confiables, duraderos y seguros, fabricados con tecnología avanzada para ofrecer el mejor agarre y confort en cualquier terreno.",
    specsFields: [
      CategorySpecsFields.type,
      CategorySpecsFields.size,
      CategorySpecsFields.loadIndex,
      CategorySpecsFields.speedIndex,
      CategorySpecsFields.features,
    ],
  },
  {
    type: CategoryType.OIL,
    name: "Lubricantes",
    svg: PaintBucket,
    description:
      "Lubricantes sintéticos y minerales de alto rendimiento, formulados para proteger el motor, reducir el desgaste y mejorar la eficiencia del vehículo.",
    specsFields: [
      CategorySpecsFields.viscosity,
      CategorySpecsFields.acea,
      CategorySpecsFields.api,
      CategorySpecsFields.type,
      CategorySpecsFields.compatibleBrands,
    ],
  },
];
