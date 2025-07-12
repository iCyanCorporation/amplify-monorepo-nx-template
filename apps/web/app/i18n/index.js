import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

// Cache i18next instances
const i18nInstancesCache = new Map()

const initI18next = async (lng, ns) => {
  const cacheKey = `${lng}:${Array.isArray(ns) ? ns.join(',') : ns}`
  
  if (i18nInstancesCache.has(cacheKey)) {
    return i18nInstancesCache.get(cacheKey)
  }

  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  
  i18nInstancesCache.set(cacheKey, i18nInstance)
  return i18nInstance
}

export async function handleTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}