import { useEffect, useState } from "react";
import {
	MessageBodyDiv,
	MessageDisplay,
	MessageHeaderDiv,
	MessageListDiv,
	MessagesContainer,
	TextArea,
} from "../Styles/Styles";
import { sendMsg } from "../Services/Setters";
import { auth } from "../firebase";
import MessageCard from "./MessageCard";
import { useMessages } from "./MessageContext";

const Messages = () => {
	const hardCodedAddresToDebug = "o3jRWkCy1DXVmZNEZ3ThL8ChOaI2";
	const messages = useMessages()
	const [outgoingText, setOutgoingText] = useState("");
	const [incomingText, setIncomingText] = useState(
		"Click a message to display it here"
	);
	const [isInputOpen, setIsInputOpen] = useState(false);

	const handleSend = async () => {
		const uid = auth.currentUser?.uid;
		if (!uid) return;
		const response = await sendMsg(hardCodedAddresToDebug, uid, outgoingText);
		if (response.succes) {
			toggleInput();
			alert(response.message);
		} else {
			alert(response.message);
		}
	};
	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setOutgoingText(event.target.value);
	};
	const toggleInput = () => {
		setIsInputOpen((prevState) => !prevState);
	};
    useEffect(() => {
        console.log("new effect")
    },[messages])

	return (
		<MessagesContainer>
			<MessageHeaderDiv>
				<h1>Messages</h1>
			</MessageHeaderDiv>
			<MessageBodyDiv>
				<MessageListDiv>
					<MessageCard handleClick={(event) => console.log("click")} />
				</MessageListDiv>
				<MessageDisplay>
					{isInputOpen ? (
						<TextArea
							placeholder="Your message here"
							onChange={handleTextChange}
						/>
					) : (
						<div>{incomingText}</div>
					)}
				</MessageDisplay>
			</MessageBodyDiv>

			{isInputOpen ? (
				<MessageHeaderDiv
					onClick={handleSend}
					style={{ cursor: "pointer" }}
				>
					<h3>Send</h3>
				</MessageHeaderDiv>
			) : (
				<MessageHeaderDiv
					onClick={toggleInput}
					style={{ cursor: "pointer" }}
				>
					<h3>Write a message</h3>
				</MessageHeaderDiv>
			)}
		</MessagesContainer>
	);
};

export default Messages;
