import PrintView from 'src/sections/print/view/print-view';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;

  return <PrintView id={id} />;
}
