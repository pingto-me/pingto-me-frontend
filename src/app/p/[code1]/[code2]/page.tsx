type Props = {
  params: {
    code1: string;
    code2: string;
  };
};

export default function Page({ params }: Props) {
  const { code1, code2 } = params;
  return (
    <div>
      {code1}/{code2}
    </div>
  );
}
