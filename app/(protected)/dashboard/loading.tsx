import { ContainerWithSpinner } from "@/components/common/container-with-spinner";

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <ContainerWithSpinner />;
}
