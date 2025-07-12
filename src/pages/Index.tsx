import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Поиск:", searchQuery);
      // Здесь будет логика поиска
    }
  };

  const handleAddChannel = () => {
    if (channelName.trim() && channelDescription.trim()) {
      console.log("Добавление канала:", { channelName, channelDescription });
      // Здесь будет логика добавления канала
      setChannelName("");
      setChannelDescription("");
      setIsDialogOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#1F2937] text-white font-inter flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Поиск Telegram каналов</h1>
          <p className="text-[#9CA3AF]">Найдите и оцените лучшие каналы</p>
        </div>

        {/* Search Section */}
        <div className="space-y-4">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]"
            />
            <Input
              type="text"
              placeholder="Поиск каналов по названию или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-[#374151] border-[#4B5563] text-white placeholder-[#9CA3AF] focus:border-[#6B7280] h-14 text-base"
            />
          </div>

          <Button
            onClick={handleSearch}
            className="w-full bg-[#6B7280] hover:bg-[#4B5563] text-white h-12 text-base font-medium"
          >
            <Icon name="Search" size={20} className="mr-2" />
            Найти каналы
          </Button>

          {/* Add Channel Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-[#4B5563] text-[#D1D5DB] hover:bg-[#374151] h-12 text-base font-medium"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить канал
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#374151] border-[#4B5563] text-white">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Добавить новый канал
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="channelName" className="text-[#D1D5DB]">
                    Название канала
                  </Label>
                  <Input
                    id="channelName"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="@channel_name или название"
                    className="bg-[#4B5563] border-[#6B7280] text-white placeholder-[#9CA3AF] mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="channelDescription"
                    className="text-[#D1D5DB]"
                  >
                    Описание
                  </Label>
                  <Textarea
                    id="channelDescription"
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                    placeholder="Краткое описание канала..."
                    className="bg-[#4B5563] border-[#6B7280] text-white placeholder-[#9CA3AF] mt-1"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleAddChannel}
                  className="w-full bg-[#6B7280] hover:bg-[#4B5563] text-white"
                >
                  Добавить канал
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Index;
