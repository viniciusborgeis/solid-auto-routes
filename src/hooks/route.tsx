import { JSX, lazy } from 'solid-js'
import { RouteDefinition, useRoutes } from 'solid-app-router'
import { IRouteHook } from '../types'
import * as routeData from '../data/routes.json'

interface IRoutesData {
    fallbackDirectories: string
    routes: IRouteHook[]
}

const ROUTES_DATA = routeData as IRoutesData
const ROUTES = ROUTES_DATA.routes
const FALLBACK_DIRECTORIES = ROUTES_DATA.fallbackDirectories

export const Route = (): JSX.Element => {
    try {
        const definitionRoutes = [] as RouteDefinition[]
        ROUTES.forEach(async route => {
            const { path, data, component } = route
            const routeObject = {} as IRouteHook

            routeObject.path = path
            routeObject.component = lazyLoad(component) as any
            if(data) routeObject.data = lazyLoad(data) as any

            definitionRoutes.push(routeObject as any)
        })

        const routes = useRoutes(definitionRoutes)
        return routes
    }
    catch(e) {
        console.error(e)
    }
}

const lazyLoad = (path: string) => lazy(() => import(`${FALLBACK_DIRECTORIES}${path}`))