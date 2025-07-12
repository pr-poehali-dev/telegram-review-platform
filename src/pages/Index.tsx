import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Channel {
  id: string;
  name: string;
  description: string;
  subscribers: number;
  rating: number;
  tags: string[];
  reviews: number;
}

const mockChannels: Channel[] = [
  {
    id: "1",
    name: "TechNews RU",
    description: "Последние новости из мира технологий на русском языке",
    subscribers: 45000,
    rating: 4.8,
    tags: ["технологии", "новости", "гаджеты"],
    reviews: 234,
  },
  {
    id: "2",
    name: "Crypto Signals Pro",
    description: "Профессиональные торговые сигналы по криптовалютам",
    subscribers: 28000,
    rating: 4.5,
    tags: ["криптовалюта", "трейдинг", "инвестиции"],
    reviews: 156,
  },
  {
    id: "3",
    name: "Дизайн & UI/UX",
    description: "Вдохновение для дизайнеров и разработчиков интерфейсов",
    subscribers: 35000,
    rating: 4.9,
    tags: ["дизайн", "ui", "ux", "творчество"],
    reviews: 89,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChannels, setFilteredChannels] = useState(mockChannels);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredChannels(mockChannels);
      return;
    }

    const filtered = mockChannels.filter(
      (channel) =>
        channel.name.toLowerCase().includes(query.toLowerCase()) ||
        channel.description.toLowerCase().includes(query.toLowerCase()) ||
        channel.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        ),
    );
    setFilteredChannels(filtered);
  };

  const formatSubscribers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-[#1F2937] text-white font-inter">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="Send" size={24} className="text-[#6B7280]" />
            <h1 className="text-xl font-bold">TG Каналы</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]"
            />
            <Input
              type="text"
              placeholder="Поиск каналов..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[#374151] border-[#4B5563] text-white placeholder-[#9CA3AF] focus:border-[#6B7280] h-12 text-base"
            />
          </div>

          {/* Add Channel Button */}
          <Button className="w-full bg-[#6B7280] hover:bg-[#4B5563] text-white h-12 text-base font-medium">
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить канал
          </Button>
        </div>
      </header>

      {/* Results Counter */}
      <div className="px-4 mb-4">
        <div className="max-w-md mx-auto">
          <p className="text-[#9CA3AF] text-sm">
            Найдено каналов: {filteredChannels.length}
          </p>
        </div>
      </div>

      {/* Channels List */}
      <main className="px-4 pb-6">
        <div className="max-w-md mx-auto space-y-4">
          {filteredChannels.map((channel) => (
            <Card
              key={channel.id}
              className="bg-[#374151] border-[#4B5563] p-4 hover:bg-[#4B5563] transition-all duration-200 hover:shadow-lg animate-fade-in transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-base mb-1">
                    {channel.name}
                  </h3>
                  <p className="text-[#D1D5DB] text-sm leading-relaxed">
                    {channel.description}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="ml-3 bg-[#6B7280] hover:bg-[#4B5563] text-white"
                >
                  Открыть
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3 text-sm text-[#9CA3AF]">
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={16} />
                  <span>{formatSubscribers(channel.subscribers)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-400" />
                  <span>{channel.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={16} />
                  <span>{channel.reviews}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {channel.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#4B5563] text-[#D1D5DB] hover:bg-[#6B7280] text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}

          {filteredChannels.length === 0 && (
            <div className="text-center py-8">
              <Icon
                name="SearchX"
                size={48}
                className="mx-auto text-[#6B7280] mb-4"
              />
              <p className="text-[#9CA3AF] mb-2">Каналы не найдены</p>
              <p className="text-[#6B7280] text-sm">
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
