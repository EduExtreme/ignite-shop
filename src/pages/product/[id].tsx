import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] mx-auto">
      <div className="max-w-[576px] w-full bg-blue-400 p-1 border rounded-lg h-96">
        <img className="object-contain" alt="" src={product.imageUrl} />
      </div>
      <div className="flex flex-col ">
        <h1 className="text-2xl text-zinc-500">{product.name}</h1>
        <span className="mt-4 block text-2xl text-zinc-500">
          {product.price}
        </span>
        <p className="mt-10 text-lg text-zinc-500">{product.description}</p>
        <Button className="mt-auto font-bold" variant="default">
          Comprar agora
        </Button>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_ORz0fr92w7kCGR" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1,
  };
};
