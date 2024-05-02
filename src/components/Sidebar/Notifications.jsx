import { useState } from "react";
import { Box, Flex, Input, Button, Tooltip, Text, IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { RiMessage2Line, RiDeleteBinLine } from "react-icons/ri";
const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [replyToMessageId, setReplyToMessageId] = useState(null);
  const [deleteMessageId, setDeleteMessageId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleRecipientIdChange = (e) => {
    setRecipientId(e.target.value);
  };

  const handleReply = (messageId) => {
    setReplyToMessageId(messageId);
  };

  const handleCancelReply = () => {
    setReplyToMessageId(null);
    setMessage("");
  };

  const handleMessageSend = async () => {
    if (message.trim() !== "" && recipientId.trim() !== "") {
      try {
        const newMessage = {
          id: Date.now(),
          sender: "Me",
          recipientId: recipientId,
          text: message,
          timestamp: new Date().toLocaleTimeString(),
          replyTo: replyToMessageId // Indique à quel message ce message répond
        };
        setChatMessages([...chatMessages, newMessage]);
        setMessage("");
        setReplyToMessageId(null); // Réinitialise le message auquel répondre
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleDeleteMessage = (id) => {
    setDeleteMessageId(id);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    // Supprimer le message
    setChatMessages(chatMessages.filter(msg => msg.id !== deleteMessageId));
    setIsDeleteAlertOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteAlertOpen(false);
  };

  return (
    <Box>
      <Tooltip
        hasArrow
        label={isChatOpen ? "Fermer le chat" : "Ouvrir le chat"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems="center"
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={toggleChat}
          cursor="pointer"
        >
          <RiMessage2Line size={32} w={{ base: 10, md: "full" }} />
          <Box  fontSize={32}display={{ base: "none", md: "block" }}>Chat</Box>
        </Flex>
      </Tooltip>
      {isChatOpen && (
        <Box
          position="fixed"
          bottom={4}
          right={4}
          bg="gray
          "
          boxShadow="md"
          borderRadius="md"
          p={4}
          maxW="400px"
          w="100%"
          zIndex="popover"
        >
          <Box mb={4}>
            {chatMessages.map((msg) => (
              <Flex key={msg.id} alignItems="center" justifyContent="space-between" mb={2}>
                <Text>
                  <strong>{msg.timestamp}</strong> - <strong>{msg.sender}</strong> to <strong>{msg.recipientId}</strong>: {msg.text}
                  {msg.replyTo && (
                    <Button size="sm" variant="link" color="blue" onClick={() => handleReply(msg.id)}>Répondre</Button>
                  )}
                </Text>
                <IconButton
                  aria-label="Supprimer le message"
                  icon={<RiDeleteBinLine />}
                  variant="ghost"
                  onClick={() => handleDeleteMessage(msg.id)}
                />
              </Flex>
            ))}
          </Box>
          <Flex alignItems="center" mb={2}>
            <Input
              placeholder="ID du destinataire"
              value={recipientId}
              onChange={handleRecipientIdChange}
              flex="1"
              mr={2}
            />
            <Input
              placeholder="Tapez votre message..."
              value={message}
              onChange={handleMessageChange}
              flex="2"
              mr={2}
            />
            <Button onClick={handleMessageSend} colorScheme="blue">Envoyer</Button>
            {replyToMessageId && (
              <Button onClick={handleCancelReply} colorScheme="gray" ml={2}>Annuler</Button>
            )}
          </Flex>
          <AlertDialog isOpen={isDeleteAlertOpen} onClose={handleCancelDelete}>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Confirmation</AlertDialogHeader>
              <AlertDialogBody>
                Êtes-vous sûr de vouloir supprimer ce message ?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={handleCancelDelete}>Annuler</Button>
                <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>Supprimer</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
