import NFTsDetailsView from 'src/sections/nfts/view/nfts-detail.view';

// ----------------------------------------------------------------------

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const { id } = params;

  return <NFTsDetailsView NFTsId={id} />;
}
