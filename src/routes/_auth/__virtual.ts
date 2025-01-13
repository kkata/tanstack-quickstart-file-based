// routes/foo/bar/__virtual.ts
import {
  defineVirtualSubtreeConfig,
  layout,
  route,
} from "@tanstack/virtual-file-routes";

export default defineVirtualSubtreeConfig([
  layout("layout.tsx", [route("/dashboard", "dashboard.tsx")]),
]);
