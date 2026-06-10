import { notFound } from "next/navigation";
import BeautyPassportDemo from "@/components/BeautyPassportDemo";
import { getTagPersona, isAllowedTagId } from "@/lib/demo-data";
import NfcDemoClient from "./nfc-demo-client";

export const dynamic = "force-dynamic";

export default async function NfcPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;

  if (!isAllowedTagId(tagId)) {
    notFound();
  }

  if (tagId === "gm-002") {
    return <BeautyPassportDemo />;
  }

  const persona = getTagPersona(tagId);

  return (
    <NfcDemoClient
      tagId={tagId}
      userName={persona.userName}
      purchasedProduct={persona.purchasedProduct}
    />
  );
}
