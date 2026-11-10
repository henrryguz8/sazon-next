export type RecipeSummary = {
  id: string;
  name: string;
  thumb: string;
  category?: string;
  area?: string;
};

export type Ingredient = {
  name: string;
  measure: string;
};

export type Recipe = RecipeSummary & {
  instructions: string;
  tags: string[];
  youtube?: string;
  source?: string;
  ingredients: Ingredient[];
};
