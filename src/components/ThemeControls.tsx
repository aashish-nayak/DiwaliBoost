import { Moon, Sun, Desktop } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeControls() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <div className="theme-controls" role="group" aria-label="Colour theme">
      {(
        [
          { value: "light", Icon: Sun },
          { value: "dark", Icon: Moon },
          { value: "system", Icon: Desktop },
        ] as const
      ).map(({ value, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={`Use ${value} theme`}
          title={`${value[0].toUpperCase()}${value.slice(1)} theme`}
          aria-pressed={mounted && theme === value}
          onClick={() => setTheme(value)}
        >
          <Icon size={18} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
