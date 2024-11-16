type Props = {
  params: {
    code1: string;
  };
};

export default function Page({ params }: Props) {
  const { code1 } = params;
  return <div>{code1}</div>;
}
