import Head from 'next/head'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../lib/posts-util'

const PostDetailPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  )
}

export const getStaticProps = ({ params }) => {
  const { slug } = params

  const postData = getPostData(slug)
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  }
}

export const getStaticPaths = () => {
  const postFilenames = getPostsFiles()

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, '')) // removes the file extension

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default PostDetailPage
