import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import { EmptyState } from "@/components/shared/empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        title="Пока здесь пусто"
        description="Совсем скоро появятся новые подарки"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Пока здесь пусто" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Совсем скоро появятся новые подарки"),
    ).toBeInTheDocument();
  });

  it("calls onAction when button is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <EmptyState
        title="Нет бронирований"
        actionLabel="Обновить"
        onAction={onAction}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Обновить" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders link action when actionHref is provided", () => {
    render(
      <EmptyState
        title="Нет товаров"
        actionLabel="Добавить"
        actionHref="/admin/products/new"
      />,
    );

    expect(screen.getByRole("link", { name: "Добавить" })).toHaveAttribute(
      "href",
      "/admin/products/new",
    );
  });
});
