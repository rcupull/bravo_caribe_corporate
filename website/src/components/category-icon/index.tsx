import { StyleProps } from "@/types/general";
import {
  Plane,
  ShoppingBag,
  Home,
  Tag,
  MapPin,
  Briefcase,
  Utensils,
  Heart,
  Camera,
  Sparkles,
  Wrench,
  Settings,
  Car,
  PaintBucket,
  CircleDot,
} from "lucide-react";

export const categoryIconsAvaliables = {
  Plane,
  ShoppingBag,
  Home,
  Tag,
  MapPin,
  Briefcase,
  Utensils,
  Heart,
  Camera,
  Sparkles,
  Wrench,
  Settings,
  Car,
  PaintBucket,
  CircleDot,
};

interface CategoryIconProps extends StyleProps {
  iconName: string;
}

export const CategoryIcon = ({ iconName, className }: CategoryIconProps) => {
  const Icon = iconName
    ? categoryIconsAvaliables[iconName]
    : categoryIconsAvaliables.Tag;

  return <Icon className={className} />;
};
