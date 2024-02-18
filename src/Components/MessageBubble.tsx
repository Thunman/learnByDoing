import { useState } from "react";
import { MessageDivProps, MessageProps } from "../Interfaces/Interfaces";
import { MessageContentBubble, MessageTextContainer } from "../Styles/Styles";
import { DocumentData } from "firebase/firestore";

const MessageBubble: React.FC<MessageDivProps> = ({
	document,
	currentUser,
}) => {
	const [showDate, setShowDate] = useState(false);
	const toggleDate = () => {
		setShowDate((prevShowDate) => !prevShowDate);
	};
	return (
		<>
			{document.map((item: MessageProps, index: number) => {
				let formattedDate = "";
				if (showDate) {
					const date = new Date(item.timestamp.seconds * 1000);
					const today = new Date();
					const hours = String(date.getHours()).padStart(2, "0");
					const minutes = String(date.getMinutes()).padStart(2, "0");
					const time = `${hours}:${minutes}`;
					if (
						date.getDate() === today.getDate() &&
						date.getMonth() === today.getMonth() &&
						date.getFullYear() === today.getFullYear()
					) {
						formattedDate = time;
					} else {
						const day = String(date.getDate()).padStart(2, "0");
						const month = String(date.getMonth() + 1).padStart(2, "0");
						const year = String(date.getFullYear()).slice(-2);
						formattedDate = `${day}/${month}/${year} ${time}`;
					}
				}
				return (
					<MessageTextContainer
						key={index}
						id={item.name}
						$isCurrentUser={item.name === currentUser}
					>
						<MessageContentBubble onClick={toggleDate}>
							{formattedDate && (
								<>
									<div style={{ fontSize: "x-small" }}>
										{formattedDate}
									</div>
								</>
							)}
							{item.msg}
						</MessageContentBubble>
					</MessageTextContainer>
				);
			})}
		</>
	);
};

export default MessageBubble;
