import Image from "next/image";
import { Header } from "@/components/header";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/apolo";
import Empty from "@/components/empty";
import {RichText} from "@graphcms/rich-text-react-renderer"
import { ElementNode } from "@graphcms/rich-text-types";

const GET_POST = gql`
  query GetPost($slugPost: String) {
    post(where: {slug: $slugPost}) {
      id
      title
      content {
        json
      }
      author {
        name
      }
      createdAt
      coverImage {
        url
      }
    }
  }
`
interface PostProps {
  post: {
    id: string;
    title: string;
    content: {
      json: ElementNode[];
    }
    coverImage: {
      url: string;
    }
    createdAt: string;
    author: {
      name: string;
    }
  }
}



export default function Post({ post }: PostProps) {
  return (
    <>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12m px-4">
        <Header />
        
        {post ? 
          <>
            <Link href={"/"} className="flex w-full max-w-fit font-bold text-zinc-900 hover:text-zinc-600" >
          Voltar
        </Link>
        <div className="w-full h-full flex flex-col mt-8">
          <div className="flex w-full h-56 sm:h-80 lg:h-[392px] relative rounded-2xl overflow-hidden">
            <Image
              alt="imagem"
              src= {post.coverImage.url}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex w-full flex-col mt-4 sm:mt-8">
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-[40px] text-blue-600">{post.title}</h1>
          <div>
            <p className="font-bold text-zinc-900">{post.author.name}</p>
            <p className="text-zinc-600 text-sm">{format(new Date(post.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
          </div>
          <div className="mt-4 sm:mt-8 mb-4 sm:mb-8">
            <RichText 
            content={post.content.json} 
            renderers={{
              p: ({ children }) => <p className="text-zinc-600 text-sm sm:text-base text-justify lg:text-left mt-4 sm:mt-8">{children}</p>,
            }}
            />
          </div>
       
        </div>
          </>
          : <Empty />
        }
      </div>
    </>
  );
}

// renderizado de forma estática
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug

  const { data } = await client.query({
    query: GET_POST,
    variables: {
      slugPost: slug
    }
  })

  return {
    props: {
      post: data.post
    },
    revalidate: 60 * 30 // 30 minutos
  }
}

// necessário à redenrização estática
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}