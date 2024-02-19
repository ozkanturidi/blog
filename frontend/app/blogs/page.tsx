import { getPosts } from "../lib/utils";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import {
  formatDate,
  formatImageUrl,
  formatReadMin,
  formatText,
} from "../lib/helper";
import SearchBar from "@/components/blogs/searchBar";
import Link from "next/link";

const Page = async ({
  searchParams,
}: {
  searchParams?: { title?: string };
}) => {
  const postsData = await getPosts(searchParams?.title);
  const posts = postsData.data;
  console.log(posts);
  return (
    <Box style={{ marginTop: 20 }}>
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Text weight={"bold"} size={"6"}>
          WELCOME TO THE BLOGS PAGE
        </Text>
        <SearchBar />
        <ul>
          <Flex
            direction={"row"}
            wrap={"wrap"}
            justify={"center"}
            align={"center"}
            gap={"5"}
          >
            {posts?.map((post) => (
              <Card
                key={post?.id}
                style={{
                  maxWidth: 1000,
                  width: 800,
                }}
              >
                <Link href={`/blogs/${post?.id}`}>
                  <Flex direction={"column"} gap={"3"}>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src={formatImageUrl(
                          post?.attributes?.author?.data?.attributes
                            ?.profilePicture?.data?.attributes?.formats
                            ?.thumbnail?.url ?? ""
                        )}
                        radius="full"
                        fallback="T"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          {`${post?.attributes?.author?.data?.attributes?.firstName} ${post?.attributes?.author?.data?.attributes?.lastName}`}
                        </Text>
                      </Box>
                      <Text>{formatDate(post?.attributes?.createdAt)}</Text>
                    </Flex>
                    <Text align={"left"} weight={"bold"}>
                      {post?.attributes?.title}
                    </Text>
                    <Flex gap="3" align={"center"} justify={"between"}>
                      <Text align={"left"}>
                        {formatText(post?.attributes?.content)}
                      </Text>
                      {/* <Image
                    src={formatImageUrl(
                      post?.attributes?.image?.data?.attributes?.formats
                        ?.thumbnail.url ?? ""
                    )}
                    alt="postImage"
                    width={250}
                    height={250}
                  /> */}
                      <img
                        src={formatImageUrl(
                          post?.attributes?.image?.data?.attributes?.formats
                            ?.thumbnail.url ?? ""
                        )}
                        alt="PostImage"
                        width={120}
                        height={120}
                      />
                    </Flex>
                    <Text>{formatReadMin(post?.attributes?.content)}</Text>
                  </Flex>
                </Link>
              </Card>
            ))}
          </Flex>
        </ul>
      </Flex>
    </Box>
  );
};

export default Page;
