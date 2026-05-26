import { TipJarPageClient } from "./tip-jar-page-client";

type TipPageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function TipPage({ params }: TipPageProps) {
  const { username } = await params;

  return <TipJarPageClient username={username} />;
}
