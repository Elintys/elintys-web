export const buildBreadcrumbLinks = (pathname, menuItems) => {
  const cleaned = pathname?.split("?")[0].split("#")[0] || "";
  const items = cleaned.split("/").filter(Boolean);
  return items.map((segment, index) => {
    const href = `/${items.slice(0, index + 1).join("/")}`;
    const fromMenu = menuItems.find((item) => item.href === href);
    const label = fromMenu?.label || segment.replace(/-/g, " ");
    return { href, label };
  });
};
