import { getSingePost } from "@/app/lib/utils";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { formatDate, formatImageUrl, formatReadMin } from "@/app/lib/helper";

import Image from "next/image";
const PostDetails = async ({ params }: { params: { id: string } }) => {
  const post = await getSingePost(params.id);
  const { title, content, likesCount, createdAt, user } = post.attributes;
  return (
    <>
      <Box pt={"4"}>
        <Flex direction={"column"} gap={"6"} align={"start"} justify={"center"}>
          <Text weight={"bold"} size={"8"}>
            {title}
          </Text>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={formatImageUrl(
                post?.attributes?.user?.data?.attributes?.profilePicture?.data
                  ?.attributes?.formats?.thumbnail?.url ?? ""
              )}
              radius="full"
              fallback="T"
            />
            <Flex direction={"column"}>
              <Text as="div" size="2" weight="medium">
                {`${user?.data?.attributes?.firstName} ${user?.data?.attributes?.lastName}`}
              </Text>

              <Flex direction={"row"} gap={"4"}>
                <Text>{formatReadMin(content)}</Text>
                <Text>{formatDate(createdAt)}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box className=" border-b-2 border-t-2 border-gray-100 w-full py-2 ">
            <Flex gap={"2"} align={"center"}>
              <ThumbUpOutlinedIcon />
              <Text>{likesCount || 0}</Text>
            </Flex>
          </Box>
          <Text>{content}</Text>
          <Image
            src={formatImageUrl(
              post?.attributes?.image?.data?.attributes?.url ?? ""
            )}
            alt="PostImage"
            width={400}
            height={400}
          />
        </Flex>
      </Box>
    </>
  );
};

export default PostDetails;
