// components/script-select.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/components/translations-context";
import { Label } from "@/components/ui/label";
import React from "react";

interface ScriptSelectorProps {
  value: string | null;
  onValueChange: (value: string) => void;
  scripts: { id: string; title: string }[];
}

export function ScriptSelector({
  value,
  onValueChange,
  scripts,
}: ScriptSelectorProps) {
  const { t } = useTranslations();

  return (
    <div className="form-group space-y-2">
      <Label htmlFor="scriptSelect" className="text-sm font-medium">
        {t("script.select")} {/* You'll need to add this translation */}
      </Label>
      <Select value={value || ""} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("script.selectPlaceholder")} />{" "}
          {/* Add this translation */}
        </SelectTrigger>
        <SelectContent>
          {scripts.map((script) => (
            <SelectItem key={script.id} value={script.id}>
              {script.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
