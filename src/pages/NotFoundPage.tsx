import { useNavigate } from "react-router-dom";

import { Layout } from "../components/UI/Layout";
import { MessageState } from "../components/UI/MessageState";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <MessageState
        code="404"
        title="Страница не найдена"
        description="Возможно, ссылка устарела или была введена неверно"
        action={{ label: "На главную", onClick: () => navigate("/candidates") }}
      />
    </Layout>
  );
};
