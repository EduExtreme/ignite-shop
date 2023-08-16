import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  });

  return (
    <main className="keen-slider" ref={sliderRef}>
      {products.map((product) => {
        return (
          <a
            href={`/product/${product.id}`}
            key={product.id}
            className="keen-slider__slide bg-gray-700 h-80 flex justify-center align-center rounded-xl border"
          >
            <img className="object-contain" alt="" src={product.imageUrl} />
            <footer className="absolute bottom-1 left-1 right-1 rounded-md gap-4 bg-blue-600 p-8 flex rounded-xl border-none">
              <strong className="text-lg text-white">{product.name}</strong>
              <span className="text-xl text-white font-medium">
                R$ {product.price}
              </span>
            </footer>
          </a>
        );
      })}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
