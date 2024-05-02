import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const authUser = useAuthStore((state) => state.user);

	if (!authUser) return null;

	return (
		<Flex  border={"3px"}justifyContent={"space-between"} alignItems={"center"} w={"full"}>
			<Flex alignItems={"center"} gap={2}>
				<Link to={`${authUser.username}`}>
					<Avatar size={"lg"} src={authUser.profilePicURL} />
				</Link>
				<Link to={`${authUser.username}`}>
					<Text fontSize={12} fontWeight={"bold"}>
						{authUser.username}
					</Text>
				</Link>
			</Flex>
			<Button
				size={"lg"}
				border={"2px"}
				background={"transparent"}
				_hover={{ background: "transparent" }}
				fontSize={20}
				fontWeight={"medium"}
				color={"blue.400"}
				onClick={handleLogout}
				isLoading={isLoggingOut}
				cursor={"pointer"}
			>
				sign Up👀
			</Button>
		</Flex>
	);
};

export default SuggestedHeader;
