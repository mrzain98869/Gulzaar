import { onRequestDelete as __api_invites__id__js_onRequestDelete } from "C:\\Users\\U S E R\\Downloads\\New folder\\new heaven\\functions\\api\\invites\\[id].js"
import { onRequestGet as __api_invites__id__js_onRequestGet } from "C:\\Users\\U S E R\\Downloads\\New folder\\new heaven\\functions\\api\\invites\\[id].js"
import { onRequestPut as __api_invites__id__js_onRequestPut } from "C:\\Users\\U S E R\\Downloads\\New folder\\new heaven\\functions\\api\\invites\\[id].js"
import { onRequestGet as __api_invites_js_onRequestGet } from "C:\\Users\\U S E R\\Downloads\\New folder\\new heaven\\functions\\api\\invites.js"
import { onRequestPost as __api_invites_js_onRequestPost } from "C:\\Users\\U S E R\\Downloads\\New folder\\new heaven\\functions\\api\\invites.js"
import { onRequest as ____path___js_onRequest } from "C:\\Users\\U S E R\\Downloads\\New folder\\new heaven\\functions\\[[path]].js"

export const routes = [
    {
      routePath: "/api/invites/:id",
      mountPath: "/api/invites",
      method: "DELETE",
      middlewares: [],
      modules: [__api_invites__id__js_onRequestDelete],
    },
  {
      routePath: "/api/invites/:id",
      mountPath: "/api/invites",
      method: "GET",
      middlewares: [],
      modules: [__api_invites__id__js_onRequestGet],
    },
  {
      routePath: "/api/invites/:id",
      mountPath: "/api/invites",
      method: "PUT",
      middlewares: [],
      modules: [__api_invites__id__js_onRequestPut],
    },
  {
      routePath: "/api/invites",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_invites_js_onRequestGet],
    },
  {
      routePath: "/api/invites",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_invites_js_onRequestPost],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  ]