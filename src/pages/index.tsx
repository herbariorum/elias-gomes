import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CardPost } from "@/components/cardpost";
import { Header } from "@/components/header";
import Empty from "@/components/empty";
import { GetServerSideProps } from "next";
import { client } from "@/lib/apolo";

const GET_ALL_POSTS = gql`
    query getAllPosts {
      posts {
        id
        title
        subtitle
        slug
        createdAt
        coverImage {
          url
        }
        author {
          name
        }
      }
    }
  `

interface AllPosts {
  posts: {
    id: string;
    slug: string;
    subtitle: string;
    title: string;
    createdAt: string;
    coverImage: {
      url: string;
    }
    author: {
      name: string;
    }
  }[]
}

export default function Home({ posts }: AllPosts) {

  return (
    <>
      <div className="w-full max-w-[1120px] flex flex-col mx-auto pb-12 px-4">
        <Header />

        {posts ?
          <>
            <Link href={`/post/${posts[posts.length - 1].slug}`} className="w-full h-full flex gap-4 flex-col sm:flex-row lg:gap-8 items-center justify-center mt-12  hover:brightness-75 transition-all">
              <div className="flex flex-1 w-full h-full min-h-[240px] md:min-h-[334px] relative rounded-2xl overflow-hidden">
                <Image
                  alt="imagem"
                  src={posts[posts.length - 1].coverImage.url} // pega o último post
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-1 h-full flex-col gap-3 lg:gap-6">
                <h1 className="font-bold text-3xl md:text-[40px] text-blue-600">{posts[posts.length - 1].title}</h1>
                <p className="text-zinc-600 text-justify text-sm md:text-base lg:text-left">{posts[posts.length - 1].subtitle}</p>
                <div>
                  <p className="font-bold text-zinc-900 text-sm md:text-base">{posts[posts.length - 1].author.name}</p>
                  <p className="text-zinc-600 text-xs md:text-sm">{format(new Date(posts[posts.length - 1].createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
              </div>
            </Link>
            <div className="flex flex-col items-center sm:grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mt-12">
              {posts.map((post, index) => {
                // pega todos menos o último post
                if (index != posts.length - 1) {
                  return (
                    <CardPost
                      key={post.id}
                      title={post.title}
                      author={post.author.name}
                      createdAt={post.createdAt}
                      subtitle={post.subtitle}
                      urlImage={post.coverImage.url}
                      slug={post.slug}
                    />
                  )
                }
              })}
            </div>
          </>
          :
          <Empty />
        }
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({ query: GET_ALL_POSTS });

  return {
    props: {
      posts: data.posts,
    }
  }
}