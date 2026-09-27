import {
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { createClientOnlyFn } from "@tanstack/react-start";
import type { MapProps } from "./LiveMap.client";

const loadLiveMap = createClientOnlyFn(() =>
  import("./LiveMap.client")
);

export function MapView(props: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fallback = (
    <div
      style={{ height: props.height ?? 480 }}
      className="w-full animate-pulse rounded-2xl bg-muted"
    />
  );

  if (!mounted) return fallback;

  return (
    <Suspense fallback={fallback}>
      <ClientMap props={props} fallback={fallback} />
    </Suspense>
  );
}

function ClientMap({
  props,
  fallback,
}: {
  props: MapProps;
  fallback: ReactNode;
}) {
  const [Component, setComponent] =
    useState<ComponentType<MapProps> | null>(null);

  useEffect(() => {
    loadLiveMap().then((module) => {
      setComponent(() => module.LiveMap);
    });
  }, []);

  if (!Component) return fallback;

  return <Component {...props} />;
}
