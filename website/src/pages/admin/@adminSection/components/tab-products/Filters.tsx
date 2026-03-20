import { useGetAllProductCategories } from "@/api/product-categories/useGetAllProductCategories";
import { FieldCheckbox } from "@/components/ui/field-checkbox";
import { FieldInput } from "@/components/ui/field-input";
import { FieldRadioGroup } from "@/components/ui/field-radio-group";
import { Formux } from "@/components/ui/formux";
import { useDebouncer } from "@/hooks/useDebouncer";
import { useRouter } from "@/hooks/useRouter";
import { ProductCategory } from "@/types/product-category";
import { useEffect } from "react";

export const Filters = () => {
  const { onChangeQuery, query } = useRouter();

  const { getAllProductCategories } = useGetAllProductCategories();

  const debouncer = useDebouncer();

  useEffect(() => {
    getAllProductCategories.fetch({ pagination: false });
  }, []);

  const allCategories = getAllProductCategories.data || [];

  return (
    <Formux
      value={{
        search: query.search,
        categorySlugs: query.categorySlugs,
      }}
      onChange={(value) => {
        debouncer(() => onChangeQuery(value, { replaceAll: true }), 500);
      }}
    >
      {() => {
        return (
          <form className="flex items-center gap-4">
            <FieldInput
              name="search"
              className="grow  rounded-3xl"
              inputClassName="!rounded-3xl"
            />

            <FieldRadioGroup<ProductCategory>
              name="categorySlugs"
              multi
              renderOption={({ checked, item }) => {
                return (
                  <FieldCheckbox
                    noUseFormik
                    value={checked}
                    label={item.name}
                  />
                );
              }}
              optionToValue={({ productCategorySlug }) => productCategorySlug}
              items={allCategories}
              containerClassName="flex items-center gap-4"
            />
          </form>
        );
      }}
    </Formux>
  );
};
