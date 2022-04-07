import HeadTitle from "../../components/HeadTitle";

export default function Detail({
  params,
}: {
  params: [title: string, id: number];
}) {
  const [title] = params || [];
  return (
    <div>
      <HeadTitle title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({
  params: { params },
}: {
  params: { params: object };
}) {
  return {
    props: {
      params,
    },
  };
}
