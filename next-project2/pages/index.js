import path from 'path'
import fs from 'fs/promises';
import Link from 'next/link';


export default function Home(props) {

  const {products} = props;

  return (
    <div>
      <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
      ))}
      </ul>
    </div>
  );
}

   export async function getStaticProps() {
    console.log('(Re-)Generating....')
    const filepath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  if(data.products.length === 0) {
    return { notFound: true};
  }

    return {

      props: {
    products: data.products
   },
   revalidate: 10,
   
    };
  }