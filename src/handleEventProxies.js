export default function handleEventProxies (proxies, origin, type, data, thisObject) {
  const proxiesList = [null, undefined].includes(proxies)
    ? []
    : Array.isArray(proxies) ? proxies : [proxies]

  proxiesList.forEach(
    proxy => proxy.trigger(type, { data, origin }, thisObject || origin)
  )
}
