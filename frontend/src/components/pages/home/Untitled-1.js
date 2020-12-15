const config = [
  {
    component: recipesCarousel,
    priority: 1,
    conditions: {
      hasBookletRecipes: true,
    },
    data: bookletRecipes,
  },
  {
    component: recipesTinderSelect,
    priority: 3,
    withStarzEnvironment: true,
    conditions: {
      isAfternoon: true,
      hasBookletRecipes: false,
    },
  },
];
