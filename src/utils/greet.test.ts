import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";

vi.mock("@tanstack/react-router", () => {
  return {
    redirect: vi.fn(),
  };
});

import { redirect } from "@tanstack/react-router";
import { greet } from "./greet";

describe("greet function", () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
    (redirect as unknown as Mock).mockClear();
  });

  it("エラーの場合、redirectが呼ばれること", () => {
    greet("");

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith({ to: "/" });
  });

  it("空文字またはundefinedを引数に渡した時、エラーがキャッチされること", () => {
    // 実行：エラーを発生させるケース
    greet("");
    greet(undefined);

    // テスト：特定のエラーメッセージがコンソールに出力される(= エラーがcatchされている)か
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "エラーが発生しました:",
      "名前が指定されていません。"
    );
    // 2回呼ばれる想定（"" と undefined の2ケース）
    expect(consoleErrorMock).toHaveBeenCalledTimes(2);
  });
});
