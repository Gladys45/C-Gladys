import type { ServiceRecord } from "../models/services";

export function getServiceBySlug(items: ServiceRecord[], slug: string) {
  return items.find((service) => service.slug === slug) ?? null;
}

export function getFeaturedServices(items: ServiceRecord[]) {
  return items.filter((service) => service.featured);
}