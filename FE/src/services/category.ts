import { get, post } from "@/lib/utils";
import { Category, CategoryRes } from "@/types/category";
export const categoryService = {
  getCategoryParents: ()=>  get<Category[]>("category/parents"),
  getCategory: ()=>  get<Category[]>("category"),
  createCategory:(data:CategoryRes) => post<Category,CategoryRes>("category",data)
};