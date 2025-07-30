import { ChatConversationComponent } from "../components/Conversation";
import { ChatsLayout } from "../layout";

function ChatsPage() {
    return (
        <ChatsLayout >
            <ChatConversationComponent />
        </ChatsLayout>
    );
}

export { ChatsPage };
