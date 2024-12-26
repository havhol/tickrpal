// src/config/middlewareRoutes.ts
const appRoutes = {
  protected: ["/dashboard", "/profile", "/company"],
  public: ["/auth/login", "/auth/signup"],
  dashboard: {
    root: "/dashboard",
    notes: "/dashboard/notes",
  },
};

export default appRoutes;
