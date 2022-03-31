import Head from "next/head";

export default function HeadTitle({ title }: { title: string }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
