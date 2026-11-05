import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
  type SyntheticEvent,
} from "react";

type Transition = { height: Animation; content?: Animation; opening: boolean };

export default function ExpandableDetails({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const element = useRef<HTMLDetailsElement>(null);
  const transition = useRef<Transition | null>(null);

  useEffect(
    () => () => {
      transition.current?.height.cancel();
      transition.current?.content?.cancel();
    },
    [],
  );

  function closedHeight(details: HTMLDetailsElement) {
    const summary = details.querySelector("summary")!;
    const style = getComputedStyle(details);
    return (
      summary.getBoundingClientRect().height +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth)
    );
  }

  function animate(opening: boolean, initialHeight?: number) {
    const details = element.current;
    if (!details) return;
    const start = initialHeight ?? details.getBoundingClientRect().height;
    transition.current?.height.cancel();
    transition.current?.content?.cancel();
    transition.current = null;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof details.animate !== "function"
    ) {
      details.open = opening;
      delete details.dataset.animating;
      return;
    }

    if (opening) details.open = true;
    const end = opening
      ? details.getBoundingClientRect().height
      : closedHeight(details);
    const body = details.querySelector<HTMLElement>(".disclosure-body");
    details.dataset.animating = "true";
    const height = details.animate(
      [{ height: `${start}px` }, { height: `${end}px` }],
      {
        duration: 280,
        easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
      },
    );
    const content = body?.animate(
      opening
        ? [
            { opacity: 0, transform: "translateY(-5px)" },
            { opacity: 1, transform: "translateY(0)" },
          ]
        : [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: opening ? 240 : 180,
        easing: "ease-out",
        fill: "forwards",
      },
    );
    transition.current = { height, content, opening };
    height.onfinish = () => {
      if (transition.current?.height !== height) return;
      details.open = opening;
      transition.current = null;
      delete details.dataset.animating;
      height.cancel();
      content?.cancel();
    };
  }

  function handleClick(event: MouseEvent<HTMLDetailsElement>) {
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const summary = event.currentTarget.querySelector("summary");
    if (
      !summary?.contains(event.target) ||
      event.target.closest("a, button, input, select, textarea")
    )
      return;
    event.preventDefault();
    animate(
      transition.current
        ? !transition.current.opening
        : !event.currentTarget.open,
    );
  }

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    const details = event.currentTarget;
    // Subsection navigation opens native details programmatically as well.
    if (details.open && !transition.current)
      animate(true, closedHeight(details));
  }

  return (
    <details
      ref={element}
      id={id}
      className={className}
      onClick={handleClick}
      onToggle={handleToggle}
    >
      {children}
    </details>
  );
}
