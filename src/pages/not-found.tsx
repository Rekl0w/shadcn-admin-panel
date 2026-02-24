import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { FileQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center space-y-4">
        <Empty>
          <div className="flex flex-col items-center gap-4">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-bold">{t("notFound.title")}</h2>
              <p className="text-muted-foreground mt-2">
                {t("notFound.description")}
              </p>
            </div>
            <Button render={<Link to="/" />}>
              {t("actions.backToDashboard")}
            </Button>
          </div>
        </Empty>
      </div>
    </div>
  );
}
