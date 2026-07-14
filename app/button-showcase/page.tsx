import type { Metadata } from "next";
import { ButtonShowcase } from "@/components/ButtonShowcase/ButtonShowcase";

export const metadata: Metadata = {
  title: "Button system",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ButtonShowcasePage() {
  return <ButtonShowcase />;
}
