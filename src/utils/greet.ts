import { redirect } from "@tanstack/react-router";

export function greet(name: string | undefined): void {
  try {
    if (!name) {
      throw new Error("名前が指定されていません。");
    }
    console.log(`こんにちは、${name}さん！`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("エラーが発生しました:", e.message);

      redirect({
        to: "/",
      });
    } else {
      console.error("予期しないエラーが発生しました:", e);
    }
  }
}
