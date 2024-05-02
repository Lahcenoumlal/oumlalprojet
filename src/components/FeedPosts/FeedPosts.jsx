import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  Checkbox,
  Button,
  Link,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const FeedPosts = () => {
  const { posts, authUser } = useGetFeedPosts();
  const [selectedVideoTypes, setSelectedVideoTypes] = useState([]);

  const handleVideoTypeChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedVideoTypes((prevSelected) => {
      if (prevSelected.includes(selectedOption)) {
        return prevSelected.filter((item) => item !== selectedOption);
      } else {
        return [...prevSelected, selectedOption];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Types de vidéos sélectionnés :", selectedVideoTypes);
  };

  return (
    <Container maxW={"container.sm"} py={10} px={4}>
      {posts.length === 0 ? (
        authUser ? (
          <Text fontSize="md" color="red.400">
            You have no posts in your feed. You might need to follow some users to see posts.
          </Text>
        ) : (
          <Box>
            <form onSubmit={handleSubmit}>
              <Text fontSize="xl" fontWeight="semibold" mb={4}>Sélectionnez un ou plusieurs types de vidéos :</Text>
              <Checkbox 
                isChecked={selectedVideoTypes.includes("comédie")}
                onChange={() => handleVideoTypeChange({ target: { value: "comédie" } })}
                size="lg"
                colorScheme="blue"
                mb={2}
              >
                Comédie
              </Checkbox>
              <Checkbox 
                isChecked={selectedVideoTypes.includes("anime")}
                onChange={() => handleVideoTypeChange({ target: { value: "anime" } })}
                size="lg"
                colorScheme="blue"
                mb={2}
              >
                Anime
              </Checkbox>
              <Checkbox 
                isChecked={selectedVideoTypes.includes("lecteur")}
                onChange={() => handleVideoTypeChange({ target: { value: "lecteur" } })}
                size="lg"
                colorScheme="blue"
                mb={2}
              >
                Lecteur
              </Checkbox>
              <Checkbox 
                isChecked={selectedVideoTypes.includes("drama")}
                onChange={() => handleVideoTypeChange({ target: { value: "drama" } })}
                size="lg"
                colorScheme="blue"
                mb={2}
              >
                Drama
              </Checkbox>
              <Checkbox 
                isChecked={selectedVideoTypes.includes("action")}
                onChange={() => handleVideoTypeChange({ target: { value: "action" } })}
                size="lg"
                colorScheme="blue"
                mb={2}
              >
                Action
              </Checkbox>
              <Button 
                type="submit" 
                colorScheme="blue" 
                size="lg" 
                borderRadius="md"
                mt={6}
              >
                Valider
              </Button>
            </form>
            <Text mt={4} color="blue.400" textDecoration="underline" fontSize="md">
              You need to create an account to see posts. Click to
              <Link href="#" color="blue.400" ml={1}>
                Sign Up <ExternalLinkIcon />
              </Link>
            </Text>
          </Box>
        )
      ) : (
        posts.map((post) => <FeedPost key={post.id} post={post} />)
      )}
      {authUser && authUser.following.length === 0 && (
        <Text mt={4} fontSize="md" color="red.400">
          You are not following any users. Follow some users or create an account to see posts.
        </Text>
      )}
    </Container>
  );
};

export default FeedPosts;
